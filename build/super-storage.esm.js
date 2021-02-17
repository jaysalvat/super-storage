var defaultSettings = {
  prefix: '',
  prefixSession: 'session',
  prefixCookie: '',
  sessionCookie: '__superStorageSession',
  sessionNative: false
};

class SuperCookie {
  constructor(settings = {}) {
    this.settings = Object.assign({}, defaultSettings, settings);
  }

  setItem(key, value, options = {
    domain: window.location.hostname,
    path: '/'
  }) {
    let optionsString = '';

    if (options.expires) {
      const date = new Date();

      date.setTime(date.getTime() + options.expires * 1000);
      optionsString += 'expires=' + date.toUTCString() + ';';
    }

    if (options.maxAge) {
      optionsString += 'max-age=' + options.maxAge + ';';
    }

    if (options.path) {
      optionsString += 'path=' + options.path + ';';
    }

    if (options.domain) {
      optionsString += 'domain=' + options.domain + ';';
    }

    if (options.secure) {
      optionsString += 'secure;';
    }

    document.cookie = this.key(key) + '=' + JSON.stringify(value) + ';' + optionsString;
  }

  getItem(key, defaultValue = null) {
    const found = document.cookie.match('(^|;)\\s*' + this.key(key) + '\\s*=\\s*([^;]+)');
    const value = found ? found.pop() : defaultValue;

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
    let optionsString = '';

    if (options.path) {
      optionsString += 'path=' + options.path + ';';
    }

    if (options.domain) {
      optionsString += 'domain=' + options.domain + ';';
    }

    document.cookie = this.key(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT;' + optionsString;
  }

  key(key) {
    const prefixes = [];

    if (this.settings.prefixCookie) {
      prefixes.push(this.settings.prefixCookie);
    }
    prefixes.push(key);

    return prefixes.join('.')
  }
}

class SuperStorage {
  constructor(storage, settings = {}) {
    this.storage = storage;

    this.settings = Object.assign({}, defaultSettings, settings);
  }

  getItem(key, defaultValue = null) {
    const value = this.storage.getItem(this.key(key));

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
      value = JSON.stringify(value);
    }

    return this.storage.setItem(this.key(key), value)
  }

  removeItem(key) {
    return this.storage.removeItem(this.key(key))
  }

  clear(prefix = null) {
    if (prefix) {
      const keys = Object.keys(this.storage);

      keys.forEach((key) => {
        if (key.indexOf(this.key(prefix)) === 0) {
          this.storage.removeItem(key);
        }
      });
    } else {
      this.storage.clear();
    }
  }

  key(key) {
    const prefixes = [];

    if (this.settings.prefix) {
      prefixes.push(this.settings.prefix);
    }
    prefixes.push(key);

    return prefixes.join('.')
  }
}

class SuperLocalStorage extends SuperStorage {
  constructor(settings = {}) {
    super(window.localStorage, settings);
  }
}

class SuperSessionStorage extends SuperStorage {
  constructor(settings = {}) {
    settings = Object.assign({}, defaultSettings, settings);

    if (!settings.sessionNative) {
      super(window.localStorage, settings);
    } else {
      super(window.sessionStorage, settings);
    }

    if (!this.settings.sessionNative) {
      this.superCookie = new SuperCookie(this.settings);

      if (!this.checkSession()) {
        this.killSession();
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
    const prefixes = [ key ];

    if (this.settings.sessionNative) {
      return key
    }

    if (this.settings.prefixSession) {
      prefixes.unshift(this.settings.prefixSession);
    }

    return prefixes.join('.')
  }

  checkSession() {
    return !!this.superCookie.getItem(this.settings.sessionCookie)
  }

  killSession() {
    this.superCookie.setItem(this.settings.sessionCookie, 'YES');
    this.clear();
  }
}

export { SuperCookie, SuperLocalStorage, SuperSessionStorage };
