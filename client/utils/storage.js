function saveState(state) {
  if (typeof window !== 'undefined' && window.localStorage) {
    if (state.app && state.app.newUsers)
    localStorage.setItem('guestlist', JSON.stringify(state.app.newUsers))
  }
}

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState)
    store.subscribe(() => {
      const state = store.getState()
      saveState(state)
    })
    return store
  }
}
