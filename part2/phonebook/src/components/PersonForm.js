import React from "react"

const PersonForm =({addPerson,nameHandler,phoneHandler,newName}) =>{
    return(
    <form onSubmit={addPerson}>
          <div>
            name: <input onChange={nameHandler} value={newName[0]} />
          </div>
          <div>
            phone: <input onChange={phoneHandler} value={newName[1]} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

export default PersonForm