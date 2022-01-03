import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './service/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([persons])

  const updateFilteredPersons = () => {
    const filtered = persons.filter(p => p.name
      .toLowerCase()
      .includes(newFilter.toLowerCase()))

    setFilteredPersons(filtered)
  }
  useEffect(() => updateFilteredPersons(), [newFilter])
  useEffect(() => updateFilteredPersons(), [persons])

  useEffect(() => {
    personService
        .getAll()
        .then(returnedPersons => {
            setPersons(returnedPersons)
        })
}, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const names = persons.map(person => person.name.toLowerCase())
    const included = names.includes(newName.toLowerCase())

    if (included) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find((p => p.name.toLowerCase() === newName.toLowerCase()))
        const changedPerson = { ...person, number: newNumber }

        personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        })
      }
    } else {
      personService
      .create(nameObject)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setNewName('')
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleClick = (id) => {
    if (window.confirm(`delete ${persons.find(p => p.id === id).name} ?`)) {
      removePerson(id)
    }
  }

  const removePerson = (id) => {
    if(persons.find(p => p.id === id)) {
      personService
      .remove(id)
      .then(() => {
        personService
          .getAll()
          .then(returnedPersons => {
            setPersons(returnedPersons)
          })
      })

      
    }
  }

  return (
    <div>
      <h2>
        Phonebook
      </h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>
        Add a new
      </h2>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>
        Numbers
      </h2>
      <Persons filtered={filteredPersons} handleClick={handleClick} />
      </div>
  )
}
export default App