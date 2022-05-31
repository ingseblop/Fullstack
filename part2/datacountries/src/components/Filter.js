import React from "react";

const Filter =({filterHandler,filter}) => {
    return(
    <div>
        Find countries: <input onChange={filterHandler} value={filter} />
    </div>
    )
}

export default Filter