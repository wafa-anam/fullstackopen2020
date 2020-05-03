import React from 'react'
import Input from './Input'

const EntryForm = (props) => {
  return (
    <>
      <form onSubmit={props.addPerson}>
          <Input name="name" text={props.newName} handler={props.nameChange} />
          <Input name="number" text={props.newNumber} handler={props.numberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default EntryForm