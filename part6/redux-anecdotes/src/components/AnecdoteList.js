import { useSelector, useDispatch } from 'react-redux'
import { voteAnec } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList= () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const filteredAnecdotes = anecdotes.filter((e) => (e.content.indexOf(filter) !== -1))
  const sort= filteredAnecdotes.sort((item1,item2)=> item2.votes-item1.votes)

    const vote = (anecdote) => {
        dispatch(voteAnec(anecdote.id))
        dispatch(showNotification(`You voted ${anecdote.content}`, 5))
      }

    return(
        <div>
        { sort.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>)}
        </div> 
    )
}

export default AnecdoteList