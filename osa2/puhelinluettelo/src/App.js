import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const Person = ({ person, delPerson }) => {

  return (
    <div>{person.name} {person.number}
    <button onClick={() => delPerson(person)}>Delete</button></div>
  )
}

const Persons = ({ persons, delPerson }) => {

  return (
    persons.map(person => 
        <Person key={person.name} person={person} delPerson={delPerson} />
    )
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
      <input
      value={newName}
      onChange={handleNameChange}
      />
      </div>
      <div>
        number:
      <input
      value={newNumber}
      onChange={handleNumberChange}
      />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form >
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
      })
  }, [])
  //console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if(persons.some(person => person.name === personObject.name)){
      window.alert(`${newName} is already added to phonebook`);
      setNewName('')
      setNewNumber('')
    }
    else {
      personService
      .create(personObject)
      .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')

      setMessage(
        `Added '${newName}'`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })
    }
    
  }

  const delPerson = person => {
    //console.log('deletePerson: ' + id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
      .deletePerson(person.id)
      setPersons(persons.filter(p => p.id !== person.id))

      setMessage(
        `Deleted '${person.name}'`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }
  
  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} />
        <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
        <Persons
          persons={persons}
          delPerson={delPerson}
        />
    </div>
  )

}

export default App