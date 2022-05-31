import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Phonebook from './components/Phonebook'


import personService from './services/persons'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState('')
  const [newName, setNewName] = useState(['',''])
  const [filter,setFilter] = useState('')
  const [added, setAdded] = useState(null)
  const va = [... persons]
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialpersons => {
        setPersons(initialpersons)
      })
  }, [])

  const addPerson = (event) => {
    let bool = false
    event.preventDefault()

    persons.forEach(person =>{
      if( person.name.includes(newName[0])&&person.name.length===newName[0].length){
        let message = newName[0] + ' is already added to phonebook'
        bool = true
        window.alert(message)
      }
    })

    if(!bool){
      const newPerson = {
          id: persons.length+1,
          name : newName[0],
          phone: newName[1]
        }


      personService
        .create(newPerson)
        .then(returnedperson => {
          setPersons(persons.concat(returnedperson))
        })
      setAdded(`Added ${newName} `)
      
    }

    setNewName(['',''])
    setTimeout(() => {
      setAdded(null)
    }, 5000)

  }

  const nameHandler =(event) =>{
    const n =[event.target.value,newName[1]]
    setNewName(n)
  }
  const phoneHandler =(event) =>{
    const n =[newName[0], event.target.value]
    setNewName(n)
  }

  const filterHandler =(event)=>{
    setFilter(event.target.value)
  }

  const ereaseHandler = id => {
    const message= `Delete ${persons[id].name}?`
    if(window.confirm(message)){
          personService
            .erease(id)
            .then(returnedperson => {
              setPersons(returnedperson.filter(n => n.id !== id))
            })
          }
  }
  

  if(filter.length > 0){
    let temp = filter.replace(filter[0],filter[0].toUpperCase())
    va= persons.filter(person => person.name.includes(filter) || person.name.includes(temp))
    
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={added}/>
      <Filter filterHandler={filterHandler} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} nameHandler={nameHandler} phoneHandler={phoneHandler} newName={newName}/>
      <h2>Numbers</h2>
      {va.map(person => <Phonebook key={person.id} name={person.name} 
                    phone={person.phone} handler={() => ereaseHandler(person.id)} />)}
      
      
    </div>
  )
}

export default App
