import React from "react"

const Countrie =({name})=> {
    return(
        <p>{name}</p>
    )

}

const CountrieInfo = (props) =>{
    let temp =[Object.values(props.languages)]
    console.log(temp)

    return(
        <div>
            <h2>{props.name}</h2>
            <p>capital {props.capital}</p>
            <p>area {props.area}</p>
            
        </div>
    )

}

const Countries=({countries,filter})=>{
    if(countries.length===0){
        return(
            <div>
                <p>cargando</p>
            </div>
        )
    }
    if(filter.length > 0){
        let temp = filter.replace(filter[0],filter[0].toUpperCase())
        
        console.log(temp)
        const va= countries.filter(countrie => countrie["name"]["common"].includes(filter) || countrie["name"]["common"].includes(temp))
        if(va.length>10){
            console.log(va.length)
            return(
            <p>Too many matches, specify another filter</p>
            )
        }
        if(va.length===1){
            console.log(va)
            return(
                <div>
                    {va.map(va => (<CountrieInfo name={va["name"]["common"]} capital={va["capital"]} area={va["area"]}
                    languages={va["languages"]}/>))}
                </div>
            )
        }
        else{        
            return(
                <div>
                    {va.map(countrie => (<Countrie key={countrie["name"]["common"]} name={countrie["name"]["common"]}/>))}
                </div>
            )
        }
    }

}

export default Countries