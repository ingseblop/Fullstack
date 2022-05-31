import React from "react";


const Phonebook = (person, handler) => {
    return(
        <div>
            <p> {person.name} {person.phone}
            <button onClick={handler}> Delete</button>
            </p>
        </div>
  
    )
  }

    
       
    
export default Phonebook

