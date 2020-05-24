import React from 'react'

const Notification = ({ isError, message }) => {

  const positiveStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const negativeStyle = {
    ...positiveStyle,
    color: 'red'
  }

  const style = isError ? negativeStyle : positiveStyle

  if (message === null) {
    return null
  }
  return (
    <div className='error' style={style}>
      {message}
    </div>
  )
}

export default Notification