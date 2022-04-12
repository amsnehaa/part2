const App = () => {
  const course = [
  {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]
  return (
    course.map(function(test) {

      var parts = test.parts.map(function(part) {
          return (
            <div>
              <p>{part.name} {part.exercises}</p>
              
            </div>
          )
      });

      return (
          <div>
              <h3>{test.name}</h3>
              {parts}
              <Total course={course[0].parts[0].exercises + 
                course[0].parts[1].exercises +
                course[0].parts[2].exercises + 
                course[0].parts[3].exercises}/>
              <Total course={course[1].parts[0].exercises +
              course[1].parts[1].exercises} />
          </div>
      )
  })
  )
}

const Total = (props) => {
  return (
    <div>
      <b>Total of {props.course} exercises</b>
    </div>
  )
}
export default App