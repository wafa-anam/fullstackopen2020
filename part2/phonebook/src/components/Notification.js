import React from 'react'

const Notification = ({type, message}) => {

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

const style = type === 'positive' ? positiveStyle: negativeStyle

    if (message === null) {
        return null
    }
    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification