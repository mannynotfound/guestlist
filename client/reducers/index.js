import {combineReducers} from 'redux'
import app from './app'
import menu from './menu'
import client from './client'
import errors from './errors'

export default combineReducers({
  app,
  client,
  menu,
  errors,
})
