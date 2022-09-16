import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':{
      const id = action.data.id
      const anecToChange = state.find(n => n.id === id)
      const changedAnec = { 
        ...anecToChange, 
        votes: anecToChange.votes +1 
      }
      return state.map(anec =>
        anec.id !== id ? anec : changedAnec 
      )
    }
    case 'CREATE':{
      return state.concat({
        content: action.data.content,
        id: action.data.id,
        votes: 0
      })
      }
    default:
      break;
  }
  return state
}
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteAnec = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
  
}

export const create =(anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer