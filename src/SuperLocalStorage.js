import SuperStorage from './SuperStorage.js'

export default class SuperLocalStorage extends SuperStorage {
  constructor(settings = {}) {
    super(window.localStorage, settings)
  }
}
