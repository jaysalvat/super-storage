import defaultSettings from './settings.js'

export default class SuperCookie {
  constructor(settings = {}) {
    this.settings = Object.assign({}, defaultSettings, settings)
  }

  setItem(key, value, options = {}) {
    options = this.mergeOptions(options)

    document.cookie = this.key(key) + '=' + JSON.stringify(value) + ';' + this.buildOptionString(options)
  }

  getItem(key, defaultValue = null) {
    const found = document.cookie.match('(^|;)\\s*' + this.key(key) + '\\s*=\\s*([^;]+)')
    const value = found ? found.pop() : defaultValue

    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }

  removeItem(key, options = {}) {
    options = this.mergeOptions(options)

    document.cookie = this.key(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT;' + this.buildOptionString({
      domain: options.domain,
      path: options.path
    })
  }

  mergeOptions(options) {
    return Object.assign({}, defaultSettings.cookieOptions, options)
  }

  buildOptionString(options) {
    let optionsString = ''

    if (options.expires) {
      const date = new Date()

      date.setTime(date.getTime() + options.expires * 1000)
      optionsString += 'expires=' + date.toUTCString() + ';'
    }

    if (options.maxAge) {
      optionsString += 'max-age=' + options.maxAge + ';'
    }

    if (options.path) {
      optionsString += 'path=' + options.path + ';'
    }

    if (options.domain) {
      optionsString += 'domain=' + options.domain + ';'
    }

    if (options.secure) {
      optionsString += 'secure;'
    }

    return optionsString
  }

  key(key) {
    const prefixes = []

    if (this.settings.cookiePrefix) {
      prefixes.push(this.settings.cookiePrefix)
    }
    prefixes.push(key)

    return prefixes.join('.')
  }
}
