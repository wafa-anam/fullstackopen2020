import React, { useState, useEffect } from 'react'
import Content from './components/Content'
import Input from './components/Input'
import EntryForm from './components/EntryForm'
import contactService from './services/contacts'
import Notification from './components/Notification'


const Header = ({ text }) => <h2>{text}</h2>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    contactService.getAll().then(initialContacts => setPersons(initialContacts))
  }, [])

  const namesToShow = searchField === '' ?
    persons :
    persons.filter(person => person.name.match(RegExp(searchField, "i")))

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const existing = persons.find(person => newPerson.name === person.name)
    if (existing === undefined) {
      contactService.create(newPerson)
        .then(response => {
          setNotification(`Added ${newName}`)
          setPersons(persons.concat(response))
        })
    }
    else {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`))
        contactService.update(existing.id, newPerson)
        .then(response => {
          setNotification(`Updated ${newName}'s number to ${newNumber}`)
          setPersons(persons.map(person => person.id !== existing.id ? person : response))
        })
        .catch(error => {
          setError(`${newName} was already removed from the server!`)
        })
    }
    setTimeout(() => {setNotification(null)}, 5000)
    setTimeout(() => {setError(null)}, 5000)
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    const id = person.id
    contactService.remove(id)
      .then(response => {
        if (window.confirm(`Delete ${person.name}?`))
          setNotification(`Deleted ${person.name}`)
          setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setError(`${person.name} was already removed from the server!`)
        setPersons(persons.filter(person => person.id !== id))
      })
    setTimeout(() => {setNotification(null)}, 5000)
    setTimeout(() => {setError(null)}, 5000)
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearchField(event.target.value)

  return (
    <div>
      <Header text="Phonebook" />
      <Notification type='positive' message={notification} />
      <Notification type='negative' message={error} />
      <Input name='search' text={searchField} handler={handleSearchChange} />
      <Header text="Add Entry" />
      <EntryForm addPerson={addPerson} nameChange={handleNameChange} numberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <Header text="Contacts" />
      <table>
        <tbody>
          {namesToShow.map(person => <Content key={person.name} person={person} deletePerson={deletePerson} />)}
        </tbody>
      </table>
    </div>
  )
}

export default App