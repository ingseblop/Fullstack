import React from "react";


const Phonebook = ({person, handler}) => {
    return(
        <div>
            <p> {person.name} {person.number}
            <button onClick={()=> handler(person.id)}> Delete</button>
            </p>
        </div>
  
    )
  }

    
       
    
export default Phonebook

