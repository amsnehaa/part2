import './App.css';
import { useState , useEffect} from 'react'
import noteService from './services/persons'
import Person from './components/Person'
// import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: 9999999999
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState(0)
  const [search, setNewSearch] = useState("");

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(n => n.id === id)
    const changedNote = { ...person, important: !person.important } 
    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setPersons(persons.map(person => person.id !== id ? person : returnedNote))
    })
  }

  const deletePersonId = (id) => {
    const person = persons.find(p => p.id === id)
    noteService
    .deletePerson(id)
    .then(response => {
      setPersons(persons.filter(p => p.id !== id))
      console.log(person)
    })
  }

  useEffect(() => {
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     setPersons(response.data)
    //   })
    noteService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNum,
      id: persons.length + 1,
      important: Math.random() > 0.5
    }

  // axios
  // .post('http://localhost:3001/persons', personObject)
  // .then(response => {
  //   console.log(response)
  //   setPersons(persons.concat(response.data))
  //   setNewName('')
  //   setNewNum('')
  // })
    noteService
      .create(personObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName('')
        setNewNum('')
      })
  }

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };
  
  const filtered = !search
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      );

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  return (
    <>
    <div>
      <h2>Phonebook</h2>
      Filter shown with:{" "}
      <input type="text" value={search} onChange={handleSearchChange} />
      <form onSubmit={addPerson}>
        <div>
          <h2>Add a new</h2>
          name: <input
          value={newName}
          onChange={handlePersonChange}
        />
        </div>
        <div>
          number: <input
          value={newNum}
          onChange={handleNumChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filtered.map(person => 
          <Person
            key={person.id}
            person={person} 
            toggleImportance={() => toggleImportanceOf(person.id)}
            deletePerson={() => window.confirm(`are you sure u want to delete '${person.name}'`, deletePersonId(person.id))}
          />
        )}
    </div>
    </>
  )
}

export default App