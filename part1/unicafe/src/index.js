import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Title = ({title}) => {
  return(
    <div>
      <h2>
        {title}
      </h2>
    </div>
  )
}

const Statistic = ({text, value}) =>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>

    </tr>
  )
}

const Statistics =({good,neutral,bad}) => {
  let all= good + neutral + bad
  let average = (good - bad)/all
  let positive = good*100/all
  if(all == 0){
    return (
      <div>
        <p>
          No feedback given
        </p>
      </div>
    )
  }
  else {
    return (
      <table>
        <tbody>
          <Statistic text={"good"} value={good}/>
          <Statistic text={"neutral"} value={neutral}/>
          <Statistic text={"bad"} value={bad}/>
          <Statistic text={"all"} value={all}/>
          <Statistic text={"average"} value={average}/>
          <Statistic text={"positive %:"} value={positive}/>
        </tbody>
      </table>
    )
  }


}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title title={"give feedback"}/>
      <Button handleClick={()=>setGood(good +1)} text="good"/>
      <Button handleClick={()=>setNeutral(neutral +1)} text="neutral"/>
      <Button handleClick={()=>setBad(bad +1)} text="bad"/>
      <Title title={"Statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)