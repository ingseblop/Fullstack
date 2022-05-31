import React from 'react'

const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ course }) => {
    let initial= 0
    let suma = course.parts.reduce((previous,current)=> previous + current.exercises,initial)

    return (
    <>
        <Header name={course.name}/>
        <div>
            {course.parts.map(part => (<Part key={part.id} part={part} />))}
            <Total sum={suma}/>
        </div>      
    </>
    )

}

const Course = ({courses}) =>{

    return (
        <div>
            {courses.map(course=> (<Content key={course.id} course={course}/>))}
        </div>
    )
    
}

export default Course