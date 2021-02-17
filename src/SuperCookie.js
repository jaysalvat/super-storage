import defaultSettings from './settings.js'

export default class SuperCookie {
  constructor(settings = {}) {
    this.settings = Object.assign({}, defaultSettings, settings)
  }

  setItem(key, value, options = {
    domain: window.location.hostname,
    path: '/'
  }) {
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

    document.cookie = this.key(key) + '=' + JSON.stringify(value) + ';' + optionsString
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

  removeItem(key, options = {
    domain: window.location.hostname,
    path: '/'
  }) {
    let optionsString = ''

    if (options.path) {
      optionsString += 'path=' + options.path + ';'
    }

    if (options.domain) {
      optionsString += 'domain=' + options.domain + ';'
    }

    document.cookie = this.key(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT;' + optionsString
  }

  key(key) {
    const prefixes = []

    if (this.settings.prefixCookie) {
      prefixes.push(this.settings.prefixCookie)
    }
    prefixes.push(key)

    return prefixes.join('.')
  }
}
