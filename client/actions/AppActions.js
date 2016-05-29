import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import {find} from 'lodash'

export function setClient(client) {
  return (dispatch) => (
     dispatch({
      'type': types.SET_CLIENT,
      client,
    })
  )
}

export function toggleCheck(user) {
  return (dispatch) => (
    dispatch({
      'type': types.TOGGLE_CHECK,
      user,
    })
  )
}

export function trashUser(user) {
  return (dispatch) => (
    dispatch({
      'type': types.TRASH_USER,
      user,
    })
  )
}

export function fetchFireSuccess(json) {
  return {
    'type': types.FETCH_FIRE_SUCCESS,
    'fire': json,
  }
}

export function onFilter(filter) {
  return {
    'type': types.ON_FILTER,
    filter,
  }
}

export function addToListSuccess(newState, actionLog) {
  return {
    'type': types.ADD_TO_LIST_SUCCESS,
    newState,
    actionLog
  }
}

export function moveAll(state, list) {
  const newState = {...state}
  const API = process.env.API || 'http://localhost:3000/api'
  const targetList = find(newState.lists, (l) => l.slug === list)
  const users = []
  const keep = list !== 'trash'

  newState.newUsers = newState.newUsers.filter((u) => {
    const exists = find(targetList.members, (m) => m.id === u.id)

    if (u.$checked && !exists) {
      users.push(u.screen_name)
      targetList.members.push(u)
    }

    /* eslint-disable no-param-reassign */
    u.$checked = false

    return keep
  })

  // if no new users to add, fire a finish dispatch
  // but with an error warning as amount
  if (!users.length) {
    return (dispatch) => (
      dispatch(addToListSuccess(newState, {
        list,
        amount: 'No new users to add!'
      }))
    )
  }

  // make api request and then report on success
  return (dispatch) => (
    fetch(`${API}/addToList/${JSON.stringify({list, users})}`)
      .then(() => dispatch(addToListSuccess(newState, {
        list,
        amount: users.length,
      })))
      .catch((error) => console.log(error))
  )
}

export function fetchFire() {
  const API = process.env.API || 'http://localhost:3000/api'

  return (dispatch) => (
    fetch(`${API}/getDB`)
      .then((response) => response.json())
      .then((json) => dispatch(fetchFireSuccess(json)))
      .catch((error) => console.log(error))
  )
}