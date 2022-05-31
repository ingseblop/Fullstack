import React from "react";

const Filter =({filterHandler,filter}) => {
    return(
    <div>
        filter shown with: <input onChange={filterHandler} value={filter} />
    </div>
    )
}

export default Filter