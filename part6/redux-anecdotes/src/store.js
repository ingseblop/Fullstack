import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import anecdoteReducer, { createAnecdote } from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReduce'
import notificationReducer from '../reducers/notificationReducer'

const combineReducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filter: filterReducer
})

const store = createStore(combineReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store