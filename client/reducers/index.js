import {combineReducers} from 'redux'
import app from './app'
import menu from './menu'
import client from './client'

export default combineReducers({
  app,
  client,
  menu,
})
