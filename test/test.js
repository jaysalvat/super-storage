/* eslint-env mocha */
/* globals chai */

const expect = chai.expect

const settings = {
  storagePrefix: 'myPrefix',
  sessionPrefix: 'mySession',
  cookiePrefix: 'myCookie'
}

import { SuperCookie, SuperLocalStorage, SuperSessionStorage } from '../src/index.js'

const superCookie = new SuperCookie(settings)
const superLocalStorage = new SuperLocalStorage(settings)
const superSessionStorage = new SuperSessionStorage(settings)

settings.sessionNative = true

const superSessionNativeStorage = new SuperSessionStorage(settings)

// COOKIE

describe('Super Cookiee', function () {
  it('Should write value', function () {
    superCookie.setItem('test', 'ok')

    expect(superCookie.getItem('test')).to.deep.equal('ok')
  })

  it('Should get default value', function () {
    expect(superSessionStorage.getItem('not exists', 'default value')).to.deep.equal('default value')
  })

  it('Should remove value', function () {
    superCookie.removeItem('test')

    expect(superCookie.getItem('test')).to.deep.equal(null)
  })
})

// LOCAL STORAGE

describe('Super Local Storage', function () {
  before(function () {
    localStorage.clear()
  })

  it('Should write value', function () {
    superLocalStorage.setItem('test', 'ok')

    expect(superLocalStorage.getItem('test')).to.deep.equal('ok')
    expect(localStorage.getItem('myPrefix.test')).to.deep.equal('ok')
  })

  it('Should get default value', function () {
    expect(superSessionStorage.getItem('not exists', 'default value')).to.deep.equal('default value')
  })

  it('Should remove value', function () {
    superLocalStorage.setItem('test', 'ok')

    expect(superLocalStorage.getItem('test')).to.deep.equal('ok')
    expect(localStorage.getItem('myPrefix.test')).to.deep.equal('ok')

    superLocalStorage.removeItem('test')

    expect(superLocalStorage.getItem('test')).to.deep.equal(null)
    expect(localStorage.getItem('myPrefix.test')).to.deep.equal(null)
  })

  it('Should clear all values', function () {
    superLocalStorage.setItem('a', 1)
    superLocalStorage.setItem('b', 2)

    expect(superLocalStorage.getItem('a')).to.deep.equal(1)
    expect(superLocalStorage.getItem('b')).to.deep.equal(2)

    superLocalStorage.clear()

    expect(superLocalStorage.getItem('a')).to.deep.equal(null)
    expect(superLocalStorage.getItem('b')).to.deep.equal(null)
  })
})

// SESSION STORAGE

describe('Super Session Storage', function () {
  before(function () {
    localStorage.clear()
  })

  it('Should write value', function () {
    superSessionStorage.setItem('test', 'ok')

    expect(superSessionStorage.getItem('test')).to.deep.equal('ok')
    expect(localStorage.getItem('myPrefix.mySession.test')).to.deep.equal('ok')
  })

  it('Should get default value', function () {
    expect(superSessionStorage.getItem('not exists', 'default value')).to.deep.equal('default value')
  })

  it('Should remove value', function () {
    superSessionStorage.setItem('test', 'ok')

    expect(superSessionStorage.getItem('test')).to.deep.equal('ok')
    expect(localStorage.getItem('myPrefix.mySession.test')).to.deep.equal('ok')

    superSessionStorage.removeItem('test')

    expect(superSessionStorage.getItem('test')).to.deep.equal(null)
    expect(localStorage.getItem('myPrefix.mySession.test')).to.deep.equal(null)
  })

  it('Should clear all values', function () {
    superSessionStorage.setItem('a', 1)
    superSessionStorage.setItem('b', 2)

    expect(superSessionStorage.getItem('a')).to.deep.equal(1)
    expect(superSessionStorage.getItem('b')).to.deep.equal(2)

    superSessionStorage.clear()

    expect(superSessionStorage.getItem('a')).to.deep.equal(null)
    expect(superSessionStorage.getItem('b')).to.deep.equal(null)
  })

  it('Should empty session', function () {
    superSessionStorage.setItem('test', 'ok')

    expect(superSessionStorage.getItem('test')).to.deep.equal('ok')
    expect(localStorage.getItem('myPrefix.mySession.test')).to.deep.equal('ok')

    superSessionStorage.killSession()

    expect(superSessionStorage.getItem('test')).to.deep.equal(null)
    expect(localStorage.getItem('myPrefix.mySession.test')).to.deep.equal(null)
  })
})

// NATIVE SESSION STORAGE

describe('Super Session Native Storage', function () {
  before(function () {
    sessionStorage.clear()
  })

  it('Should write value', function () {
    superSessionNativeStorage.setItem('test', 'ok')

    expect(superSessionNativeStorage.getItem('test')).to.deep.equal('ok')
    expect(sessionStorage.getItem('myPrefix.test')).to.deep.equal('ok')
  })

  it('Should get default value', function () {
    expect(superSessionNativeStorage.getItem('not exists', 'default value')).to.deep.equal('default value')
  })

  it('Should remove value', function () {
    superSessionNativeStorage.setItem('test', 'ok')

    expect(superSessionNativeStorage.getItem('test')).to.deep.equal('ok')
    expect(sessionStorage.getItem('myPrefix.test')).to.deep.equal('ok')

    superSessionNativeStorage.removeItem('test')

    expect(superSessionNativeStorage.getItem('test')).to.deep.equal(null)
    expect(sessionStorage.getItem('myPrefix.test')).to.deep.equal(null)
  })

  it('Should clear all values', function () {
    superSessionNativeStorage.setItem('a', 1)
    superSessionNativeStorage.setItem('b', 2)

    expect(superSessionNativeStorage.getItem('a')).to.deep.equal(1)
    expect(superSessionNativeStorage.getItem('b')).to.deep.equal(2)

    superSessionNativeStorage.clear()

    expect(superSessionNativeStorage.getItem('a')).to.deep.equal(null)
    expect(superSessionNativeStorage.getItem('b')).to.deep.equal(null)
  })
})
