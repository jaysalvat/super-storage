[![npm version](https://badge.fury.io/js/%40jaysalvat%2Fsuper-storage.svg)](https://badge.fury.io/js/%40jaysalvat%2Fsuper-storage)

Super Storage 
=============

Super Storage provides some helpers over cookie, localStorage and sessionStorage.

- [x] 1Kb gzipped
- [x] Store all type of values (objects and arrays)
- [x] Default value when empty
- [x] Prefix key
- [x] Session kept between tabs

## Install

Install npm package

```sh
npm install @jaysalvat/super-storage
```

## Usage

```javascript
import { SuperCookie, SuperLocalStorage, SuperSessionStorage } from '@jaysalvat/super-storage'

const settings = {
  storagePrefix: 'myApp'
}

const superCookie = new SuperCookie(settings)
const superLocalStorage = new SuperLocalStorage(settings)
const superSessionStorage = new SuperSessionStorage(settings)
```

## Settings

Default settings.

```javascript
{
  storagePrefix: '',
  sessionCookieName: '__superStorageSession',
  sessionNative: false,
  sessionPrefix: 'session',
  cookiePrefix: '',
  cookieOptions: {
    domain: null,
    path: null,
    maxAge: null,
    expires: null,
    secure: null
  }
}
```

## SuperLocalStorage

### setItem

Set a value

```javascript
superLocalStorage.setItem('key', 'data')
```

### getItem

Get a value

```javascript
superLocalStorage.getItem('key')
superLocalStorage.getItem('key', 'default value')
```

### removeItem

Remove a value

```javascript
superLocalStorage.removeItem('key')
```

### clear

Remove all value

```javascript
superLocalStorage.clear()
```



## SuperSessionStorage

Note: If `sessionNative` set to false (default) in the settings, `SuperSessionStorage`
will use the native `localStorage` to store values and a cookie in order to watch the 
browser session. This trick allows `SuperSessionStorage` to be kept between tabs and 
windows (unlike native `sessionStorage`)

### setItem

Set a value

```javascript
superSessionStorage.setItem('key', 'data')
```

### getItem

Get a value

```javascript
superSessionStorage.getItem('key')
superSessionStorage.getItem('key', 'default value')
```

### removeItem

Remove a value

```javascript
superSessionStorage.removeItem('key')
```

### clear

Remove all value

```javascript
superSessionStorage.clear()
```



## SuperCookie

### setItem

Set a value. 
Options can be passed (merged with global settings `cookieOptions`)

```javascript
  const options = {
    domain: null,
    path: null,
    maxAge: null,
    expires: null,
    secure: null
  }
```

See [Cookie specs](https://developer.mozilla.org/fr/docs/Web/HTTP/Cookies).

```javascript
superCookie.setItem('key', 'data', [options]))
```

### getItem

Get a value

```javascript
superCookie.getItem('key')
superCookie.getItem('key', 'default value')
```

### removeItem

Remove a value. Options `path` and `domain` can be passed.

```javascript
 const options = {
    domain: 'mydomain.com',
    path: '/',
  }
```

```javascript
superCookie.removeItem('key', [options])
```


## Dev

Dev mode

```sh
npm run dev
```

Build

```sh
npm run build
```

Lint

```sh
npm run lint
```

Fix lint errors

```sh
npm run lint:fix
```

Bump version and publish to NPM

```sh
npm run release
npm run release:patch
npm run release:minor
npm run release:major
```
