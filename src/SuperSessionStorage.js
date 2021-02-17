import SuperStorage from './SuperStorage.js'
import SuperCookie from './SuperCookie.js'
import defaultSettings from './settings.js'

export default class SuperSessionStorage extends SuperStorage {
  constructor(settings = {}) {
    settings = Object.assign({}, defaultSettings, settings)

    if (!settings.sessionNative) {
      super(window.localStorage, settings)
    } else {
      super(window.sessionStorage, settings)
    }

    if (!this.settings.sessionNative) {
      this.superCookie = new SuperCookie(this.settings)

      if (!this.checkSession()) {
        this.killSession()
      }
    }
  }

  getItem(key, defaultValue = null) {
    return super.getItem(this.sessionKey(key), defaultValue)
  }

  setItem(key, value) {
    return super.setItem(this.sessionKey(key), value)
  }

  removeItem(key) {
    return super.removeItem(this.sessionKey(key))
  }

  clear() {
    return super.clear(this.sessionKey(''))
  }

  sessionKey(key) {
    const prefixes = [ key ]

    if (this.settings.sessionNative) {
      return key
    }

    if (this.settings.prefixSession) {
      prefixes.unshift(this.settings.prefixSession)
    }

    return prefixes.join('.')
  }

  checkSession() {
    return !!this.superCookie.getItem(this.settings.sessionCookie)
  }

  killSession() {
    this.superCookie.setItem(this.settings.sessionCookie, 'YES')
    this.clear()
  }
}
