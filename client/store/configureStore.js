import {applyMiddleware, createStore, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import storage from '../utils/storage'

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  storage(),
  typeof window !== 'undefined' && window.devToolsExtension ?
    window.devToolsExtension() : (nope) => nope
)

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer)
}
