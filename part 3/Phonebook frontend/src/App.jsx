import React from 'react';
import { useState, useEffect } from 'react';
import personService from './services/persons';
import Notification from "./components/Notification.jsx";

const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.value} onChange={props.onChange} />
        </div>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                name: <input id="name" value={props.name_value} onChange={props.onNameChange} />
            </div>
            <div>
                number: <input id="number" value={props.number_value} onChange={props.onNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Person = ({person, deleteNumber}) => {
    return (
        <p>
            {person.name} {person.number}
            <button onClick={() => deleteNumber(person.id)}>delete</button>
        </p>
    )
}

const Persons = (props) => {
    if (!props.persons) {
        return null
    }

    return (
        <div>
            {props.persons.map((person, i) => <Person key={i} person={person} deleteNumber={props.removeItem} />)}
        </div>
    )

}

const App = () => {
    const [persons, setPersons] = useState(null);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchedName, setSearchedName] = useState('')
    const [successfulMessage, setSuccessfulMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const addPerson = (event) => {
        event.preventDefault()
        for (let i = 0; i < persons.length; i++) {
            if (newName === persons[i].name) {
                if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                    let newObject = {
                        name: persons[i].name,
                        number: newNumber,
                        id: persons[i].id
                    }

                    personService.update(persons[i].id, newObject)
                        .then(returnedPerson => {
                            setPersons(persons.map(person => person.id !== persons[i].id ? person : returnedPerson))
                            setSuccessfulMessage(`Changed number for ${returnedPerson.name}`)
                            setTimeout(() => {
                                setSuccessfulMessage(null)
                            }, 5000)
                        })
                }
                return
            }
        }
        const personObject = {
            name: newName,
            number: newNumber,
        }

        personService.create(personObject)
            .then(returnedPerson => {
                setSuccessfulMessage(`Added ${returnedPerson.name}`)
                setTimeout(() => {
                    setSuccessfulMessage(null)
                }, 5000)
                setPersons(persons.concat(returnedPerson))
                setNewName("")
                setNewNumber("")
            })

    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearch = (event) => {
        setSearchedName(event.target.value)

    }

    const deleteNumber = (id) => {
        const personToDelete = persons.find(person => person.id === id);
        if (confirm(`Delete ${personToDelete.name}?`)) {
            const indexOfNumber = persons.findIndex(person => person.id === id);
            const updatedPersons = persons.filter((person, i) => i !== indexOfNumber);
            personService.deleteItem(id)
                .then(() => {
                    setPersons(updatedPersons);
                })
                .catch(error => {
                    setErrorMessage(
                        `Information of '${personToDelete.name}' has already been removed from server`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
        }

    }

    const personsToShow = () => {
        if (searchedName === '') {
            return persons
        } else {
            return persons.filter(person => person.name.toLowerCase().includes(searchedName.toLowerCase()))
        }
    }

    useEffect(() => {
        personService.getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])


    return (
        <div>
            <h2>Phonebook</h2>

            <Notification className='successfulOperation' message={successfulMessage} />
            <Notification className='error' message={errorMessage} />

            <Filter value={searchedName} onChange={handleSearch} />

            <h3>Add a new</h3>

            <PersonForm onSubmit={addPerson} name_value={newName} onNameChange={handleNameChange} number_value={newNumber} onNumberChange={handleNumberChange} />

            <h3>Numbers</h3>

            <Persons persons={personsToShow()} removeItem={deleteNumber} />

        </div>
    )
}

export default App