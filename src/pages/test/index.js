import {createStore, combineReducers } from 'redux'

const reducer = (state, action) => {
  return state + '_new'
}
// ..
let {subscribe, dispatch, getState} = createStore(reducer)

const store = createStore(reducer)
const state = store.getState()

// maybe you need common action creator
const action = {
  type: 'first_action',
  payload: 'ddfaf'
}

store.dispatch(action)


