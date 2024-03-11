
## Matomo Plugin for UniApp

This [Matomo](https://www.matomo.org) plugin is designed for [UniApp](https://uniapp.dcloud.io).

### Installation

```bash
npm install matomo-uniapp
```

### Usage

```javascript
import App from './App'
import Matomo from 'matomo-uniapp'

Vue.use(Matomo, {
  url: 'https://your-matomo-instance.com',
  siteId: 1,
})

const app = new Vue({
  ...App
})
app.$mount()

//When the user logs in, set the user ID.
matomo.setUserId('example-user-id');
```

### API

#### `new Matomo(options)`

- `options` (Object):
  - `url` (String): The URL of your Matomo instance.
  - `siteId` (Number): The ID of the site you want to track.

#### `matomo.setUserId(userId)`
- `userId` (String): Defines the User ID for this request. The User ID is any non-empty unique string identifying the user (such as an email address or a username).

### License

[MIT License](https://opensource.org/licenses/MIT)

### Keywords

[matomo](https://www.npmjs.com/search?q=matomo), [uniapp](https://www.npmjs.com/search?q=uniapp)
