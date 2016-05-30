<p align="center">
  <img src="https://raw.githubusercontent.com/mannynotfound/guestlist/master/guestlist.png" />
</p>

# Guestlist

Web app creation tool for easily creating human curated Twitter lists to be used as training sets.

# Features

- [x] Easily select many users and perform batch actions
- [x] Stores your client info in a serialized cookie for easy & safe usage
- [x] Saves loaded user lists into local storage 
- [x] Create and push to lists from within app
- [x] Import the friends/followers of other users into your user pool
- [x] Filter by unlisted, selected, or by list memberships

# Usage

```bash
$ npm install
```

### Environment Variables

Variable | Description | Default
:------- | :---------- | :------
consumer_key | Twitter app consumer key | null
consumer_secret | Twitter app consumer key secret | null
callback_url | url for handling oAuth callback | http://localhost
API | url for handling API requests  | http://localhost:3000/api

Start development server:

```bash
$ npm run start:dev
```

Start production server:

```bash
$ npm start
```

DEPLOY:

```bash
$ git push heroku master
```

# TODO:

* ~~Set up Auth flow, currently pulling account from config file~~
* ~~Add user fetching tools, currently static list of users~~
* ~~Caching fetched users in local storage~~
* ~~Ability to create list from app~~
* ~~Convenient actions in the 'Actions' menu~~
* Export lists to various formats for data processing
* Add profile screen w/ login/logout buttons (currently have to kill cookie)
* Add ability to concatenate user searches (current only replaces)

# Tech Stack

- [x] [firebase](https://firebase.com/)
- [x] [Babel](https://babeljs.io/)
- [x] [ESLint](http://eslint.org/)
- [x] [Express](http://expressjs.com/)
- [x] [Mocha](https://mochajs.org/)
- [x] [React](http://facebook.github.io/react/)
- [x] [React Router](https://github.com/reactjs/react-router)
- [x] [React Transform HMR](https://github.com/gaearon/react-transform-hmr)
- [x] [Redux](http://redux.js.org/)
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] [Webpack](https://webpack.github.io)

# Structure

```bash
.
├── client                    # Source code for client-side application
│   ├── actions               # Redux action creators
│   ├── components            # Presentational/dumb components
│   ├── constants             # Global constants (action types etc.)
│   ├── containers            # Stateful/smart components
│   ├── reducers              # Redux reducers
│   ├── routes                # Routes used by React Router (shared with server)
│   ├── store                 # Redux store
│   └── index.js              # Entry point for client-side application
├── server                    # Source code for Express server
│   ├── api                   # Mock API
│   ├── middleware            # Server middleware
│   ├── views                 # Server views (Jade templates)
│   ├── index.js              # Entry point for server (with babel-register etc.)
│   └── server.js             # Express server
├── test                      # Test setup and helpers
├── .babelrc                  # Babel configuration
├── .eslintrc                 # ESLint configuration
└── webpack.config.babel.js   # Webpack configuration
```

