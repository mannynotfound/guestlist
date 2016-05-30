import * as types from '../constants/ActionTypes'
import reduceUsers from '../utils/reduceUsers'
import {find} from 'lodash'

export function toggleMenu(context) {
  return (dispatch) => (
    dispatch({
      'type': types.TOGGLE_MENU,
      context,
    })
  )
}

export function getUsersSuccess(json) {
  return {
    'type': types.GET_USERS_SUCCESS,
    'users': json,
  }
}

export function createListSuccess(options) {
  return {
    'type': types.CREATE_LIST_SUCCESS,
    options,
  }
}

export function gotError(err) {
  console.error('SOMETHING WENT WRONG!')
  console.log(err)
  return {
    'type': types.GOT_ERROR,
    err,
  }
}

export function addToListSuccess(newState, actionLog) {
  return {
    'type': types.ADD_TO_LIST_SUCCESS,
    newState,
    actionLog
  }
}

export function moveAll(cookie, state, list) {
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
    fetch(`${API}/addToList/${JSON.stringify({list, users})}`, {
      method: 'POST',
      body: cookie,
    })
    .then((resp) => {
      if (resp.status === 500) {
        dispatch(gotError(resp.json().err))
      }

      return dispatch(addToListSuccess(newState, {
        list,
        amount: users.length,
      }))
    })
    .catch((error) => console.log(error))
  )
}

export function createList(cookie, options) {
  const API = process.env.API || 'http://localhost:3000/api'

  return (dispatch) => (
    fetch(`${API}/createList/${JSON.stringify(options)}`, {
      method: 'POST',
      body: cookie,
    })
    .then((resp) => {
      if (resp.status === 500) {
        dispatch(gotError(resp.json().err))
      }

      return resp.json()
    })
    .then(() => dispatch(createListSuccess(options)))
    .catch((error) => dispatch(gotError(error)))
  )
}

export function getUsers(cookie, options) {
  const API = process.env.API || 'http://localhost:3000/api'

  return (dispatch) => (
    fetch(`${API}/getUsers/${JSON.stringify(options)}`, {
      method: 'POST',
      body: cookie,
    })
    .then((resp) => {
      if (resp.status === 500) {
        dispatch(gotError(resp.json().err))
      }

      return resp.json()
    })
    .then((json) => dispatch(getUsersSuccess(reduceUsers(json.users))))
    .catch((error) => dispatch(gotError(error)))
  )
}

export function uploadJSON(files) {
  const API = process.env.API || 'http://localhost:3000/api'
  const data = new FormData()
  data.append('jsonfile', files[0])

  return (dispatch) => (
    fetch(`${API}/uploadJSON`, {
      method: 'POST',
      body: data,
    })
    .then((response) => response.json())
    .then((json) => dispatch(getUsersSuccess(reduceUsers(json.users))))
    .catch((error) => dispatch(gotError(error)))
  )
}

export function saveUsers(users) {
  const API = process.env.API || 'http://localhost:3000/api'

  return () => (
    fetch(`${API}/download/json/${JSON.stringify(users)}`)
  )
}
