import * as types from '../constants/ActionTypes'
import reduceUsers from '../utils/reduceUsers'

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

export function gotError(err) {
  console.error('SOMETHING WENT WRONG!')
  console.log(err)
  return {
    'type': types.GOT_ERROR,
    err,
  }
}

export function getUsers(options) {
  const API = process.env.API || 'http://localhost:3000/api'

  return (dispatch) => (
    fetch(`${API}/getUsers/${JSON.stringify(options)}`)
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
