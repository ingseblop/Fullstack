import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'
import Countries from './components/Countries'

const App =() =>{
  const [countries, setCountries] = useState('')
  const [filter,setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const filterHandler =(event)=>{
    setFilter(event.target.value)
  }

  return(
    <div>
      <Filter filterHandler={filterHandler} value={filter}/> 
      <Countries countries={countries} filter={filter}/>
    </div>
  )

}

export default App;
