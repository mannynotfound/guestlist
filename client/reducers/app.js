import * as types from '../constants/ActionTypes'
import {find, without} from 'lodash'

export default function app(state = {}, action) {
  let newState = {...state}

  switch (action.type) {
    case types.FETCH_FIRE_SUCCESS:
      return action.fire
    case types.TOGGLE_CHECK:
      const user = find(newState.newUsers, (u) => u.id === action.user.id)
      user.$checked = !user.$checked

      return newState
    case types.TRASH_USER:
      newState.newUsers = without(newState.newUsers, action.user)

      return newState
    case types.ADD_TO_LIST_SUCCESS:
      newState = action.newState
      newState.actionLog = action.actionLog

      return newState
    case types.ON_FILTER:
      if (!newState.filtered) {
        newState.filtered = []
      }

      const index = newState.filtered.indexOf(action.filter)

      if (index > -1) {
        newState.filtered.splice(index, 1)
      } else {
        newState.filtered.push(action.filter)
      }

      return newState
    default:
      return state
  }
}
