import React from 'react'

const Content = ({ person, deletePerson }) => {
    return (
      <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td><button onClick={() => deletePerson(person)}>delete</button></td>
      </tr>
    )
  }

  export default Content
  