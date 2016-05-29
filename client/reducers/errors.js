import * as types from '../constants/ActionTypes'

export default function errors(state = {}, action) {
  const newState = {...state}

  switch (action.type) {
    case types.GOT_ERROR:
      newState.error = action.err
      return newState
    default:
      return state
  }
}
