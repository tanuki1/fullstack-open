import React, { useState } from 'react'

const Header = ({ header }) => (
    <div>
      <h1>{header}</h1>
    </div>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  if(props.all === 0) {
    return (
    <div>
      No feedback given
    </div>
    )
  }

  return (
    <table>
    <tbody>
    <tr>
      <td>good</td>
      <td>{props.numberGood}</td> 
    </tr>
    <tr>
      <td>neutral</td>
      <td>{props.numberNeutral}</td>
    </tr>
    <tr>
      <td>bad</td>
      <td>{props.numberBad}</td>
    </tr>
    <tr>
      <td>all</td>
      <td>{props.all}</td>
    </tr>
    <tr>
    <td>average</td>
    <td>{props.average}</td>
    </tr>
    <tr>
    <td>positive</td> 
    <td>{props.positive} %</td>
    </tr>
    </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)
  const [points, setPoints] = useState(0)

  const handleGoodClick = () => {
    setAll(allClicks + 1)
    setPoints(points + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks + 1)
    setPoints(points - 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header="give feedback" />
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick}  text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <Header header="statistics"/>
      <Statistics numberGood={good} numberNeutral={neutral} numberBad={bad} all={allClicks} average={points / allClicks} positive={good / allClicks * 100} />
    </div>
  )
}

export default App