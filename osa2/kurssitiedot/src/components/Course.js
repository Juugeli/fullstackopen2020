import React from 'react'

const Header = () => {
    return (
      <div>
        <h1>Web development curriculum</h1>
      </div>
    )
  }
  
  const Content = ({ name, parts }) => {
  
    return(
      <div>
        <h2>{name}</h2>
        {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
      </div>
    
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
  }
  
  
  const Total = ({ parts }) => {
  
   const total = parts.reduce( (s, parts) => s + parts.exercises, 0)
  
    return (
      <div>
        <b>total of {total} exercises</b>
      </div>
    )
  
  }
  
  
  const Course = ({ courses }) => {
  
    return (
      <div>
        <Header />
        <div> 
          {courses.map(course =>
            <div key={course.id}>
              <Content name={course.name} parts={course.parts} />
              <Total parts={course.parts} />
            </div>
          )}
        </div>
      </div>
    )
  }

  export default Course