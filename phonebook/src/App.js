import './App.css';
import { useState , useEffect} from 'react'

import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      num: 9999999999
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState(0)
  // const [search, setNewSearch] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

        const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
          name: newName,
          num: newNum,
          id: persons.length + 1,
        }

      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNum('')
      })
      }



  // const handleSearchChange = (e) => {
  //   setNewSearch(e.target.value);
  // };

  // const filtered = !search
  //   ? persons
  //   : persons.filter((person) =>
  //       person.name.toLowerCase().includes(search.toLowerCase())
  //     );

      

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
      {/* Filter shown with:{" "}
      <input type="text" value={search} onChange={handleSearchChange} /> */}
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
      <div>
      {persons.map((person, index) => {
        return (
          <p key={index}>
            {person.name} - {person.num}
          </p>
        );
      })}
      </div>
    </div>
    </>
  )
}

export default App