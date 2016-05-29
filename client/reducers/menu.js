import * as types from '../constants/MenuTypes'
import * as actionTypes from '../constants/ActionTypes'

export default function menu(state = {}, action) {
  const newState = {...state}

  switch (action.type) {
    case actionTypes.ADD_TO_LIST_SUCCESS:
      newState.open = false
      return newState
    case types.TOGGLE_MENU:
      if (newState.open && action.context === newState.context) {
        newState.open = false
      } else if (newState.open) {
        newState.context = action.context
      } else {
         newState.open = true
         newState.context = action.context
      }
      return newState
    default:
      return state
  }
}
