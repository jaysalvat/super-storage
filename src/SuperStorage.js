import defaultSettings from './settings.js'

export default class SuperStorage {
  constructor(storage, settings = {}) {
    this.storage = storage

    this.settings = Object.assign({}, defaultSettings, settings)
  }

  getItem(key, defaultValue = null) {
    const value = this.storage.getItem(this.key(key))

    if (!value) {
      return defaultValue
    }

    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }

  setItem(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }

    return this.storage.setItem(this.key(key), value)
  }

  removeItem(key) {
    return this.storage.removeItem(this.key(key))
  }

  clear(prefix = null) {
    if (prefix) {
      const keys = Object.keys(this.storage)

      keys.forEach((key) => {
        if (key.indexOf(this.key(prefix)) === 0) {
          this.storage.removeItem(key)
        }
      })
    } else {
      this.storage.clear()
    }
  }

  key(key) {
    const prefixes = []

    if (this.settings.storagePrefix) {
      prefixes.push(this.settings.storagePrefix)
    }
    prefixes.push(key)

    return prefixes.join('.')
  }
}
