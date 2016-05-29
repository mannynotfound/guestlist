import * as types from '../constants/MenuTypes'

export function toggleMenu(context) {
  return (dispatch) => (
    dispatch({
      'type': types.TOGGLE_MENU,
      context,
    })
  )
}
