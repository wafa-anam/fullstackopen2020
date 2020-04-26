import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Info = ({ anecdote, points }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {points} votes</p>
    </>
  )
}

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6).fill(0))

  const maxVotes = points.indexOf(Math.max(...points))
  const randomAnecdote = () => setSelected(Math.floor(Math.random() * 6))

  const addVote = () => {
    const newVotes = [...points]
    newVotes[selected] += 1
    setPoints(newVotes)
  }

  return (
    <div>
      <Header text='Anecdote of the Day' />
      <Info anecdote={props.anecdotes[selected]} points={points[selected]} />
      <div>
        <Button handleClick={addVote} text='votes' />
        <Button handleClick={randomAnecdote} text='next anecdote' />
      </div>
      <Header text='Anecdote with Most Votes' />
      <Info anecdote={props.anecdotes[maxVotes]} points={points[maxVotes]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)