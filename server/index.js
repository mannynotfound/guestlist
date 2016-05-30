// create local process.env.variables if config file found

try {
  var config = require('../config')
  Object.keys(config).forEach((k) => {
    process.env[k] = config[k]
  })
} catch(e) {
  console.log('NO CONFIG FILE, RELYING ON SET ENV VARIABLES')
}

require('babel-register')
require('./server')
