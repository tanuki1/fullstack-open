import React, { useState } from 'react'

const Button = ({ onClick, text, disable }) => (
  <button disabled={disable} onClick={onClick}>
    {text}
  </button>
)

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Header = ({ header }) => (
  <div>
    <h1>{header}</h1>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [points, setPoints] = useState(new Array(7).fill(0))
   
  const [selected, setSelected] = useState(0)

  const [disable, setDisable] = useState(false);

  const newAnecdoteClick = () => {
    setSelected(getRandomInt(7))
    setDisable(false)
  }

  const copy = points.slice()

  const voteClick = () => {
    copy[selected] += 1
    setPoints(copy)
    setDisable(true)
  }

  return (
    <div>
    <Header header="Anecdote of the day" />
    {anecdotes[selected]}
    <br></br>
     has {points[selected]} votes
     <br></br>
    <Button onClick={newAnecdoteClick} text="next anecdote" />
    <Button disable={disable} onClick={voteClick} text="vote" />
    <Header header="Anecdote with most votes" />
    {anecdotes[Math.max(...points)]}
    <br></br>
    has {Math.max(...points)} votes
    </div>
  )
}

export default App
