import React from 'react'

const Header = ({header}) => {
  
  return(
  <div>
    <h2>
      {header}
    </h2>
  </div>
  )
}

const Part = ({name, number}) => (
 <div>
   <p>
   {name} {number}
   </p>
 </div>
)

const Total = (props) => (
  <div>
    total of {props.total} exercises
  </div>
)

const Courses = ({courses}) => {
  const getTotalExercises = (parts) => {
    const array = parts.map(value => value.exercises)
    return array.reduce((s,p) => s + p)
  }
  const getParts = (parts) => parts.map(value => <Part key={value.id} name={value.name} number={value.exercises} />)

  return(
    courses.map(course => 
      <div key={course.id}>
        <Header header={course.name} />
        {getParts(course.parts)}
        <Total total={getTotalExercises(course.parts)} />
      </div>
    )
  )
}

export default Courses