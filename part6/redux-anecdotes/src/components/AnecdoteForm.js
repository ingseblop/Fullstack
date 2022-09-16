import { create } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    const createAnec = (event) => {
        event.preventDefault()
    const anecdoteObject = {
      content: event.target.anecdote.value,
      id: null,
      votes: 0
    }
    event.target.anecdote.value = ''
    props.create(anecdoteObject)
    
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnec}>
                <div><input name="anec" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    create
  }
  
  const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
  )(AnecdoteForm)

export default ConnectedAnecdoteForm 