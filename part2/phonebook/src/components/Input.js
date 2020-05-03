import React from 'react'

const Input = ({ name, text, handler }) => {
    return (
      <div>
        {name}:
        <input value={text}
          onChange={handler} />
      </div>
    )
  }

  export default Input