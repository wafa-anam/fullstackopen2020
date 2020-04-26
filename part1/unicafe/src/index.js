import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({ handleClick, name }) => {
  return (
    <button onClick={handleClick}>
      {name}
    </button>
  )
}
const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={(good - bad) / all} />
          <Statistic text="positive" value={(good / all) * 100 + '%'} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodReview = () => setGood(good + 1)
  const neutralReview = () => setNeutral(neutral + 1)
  const badReview = () => setBad(bad + 1)

  return (
    <div>
      <Header text='please leave feedback' />
      <Button handleClick={goodReview} name='good' />
      <Button handleClick={neutralReview} name='neutral' />
      <Button handleClick={badReview} name='bad' />
      <Header text='statistics' />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
