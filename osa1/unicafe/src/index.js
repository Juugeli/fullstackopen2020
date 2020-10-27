import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )

const StatisticLine = ({text, value}) => {
  return(
  <div>{text} {value}</div>
  )
}

const Statistics = ({good, neutral, bad}) => {

  if (good === 0 && neutral === 0 && bad === 0)
    return (
      <div>No feedback given</div>
    )

    const calculateAverage = () => {
        if (good === 0 && neutral === 0 && bad === 0)
            return 0
        return (good * 1 + neutral * 0 + bad * -1)/ (good + neutral + bad)
    }
    
    const calculatePositive = () => {
        if (good === 0)
            return 0
        return (good / (good + neutral + bad)) * 100
    }

    return (
        <div>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={good + neutral + bad} />
          <StatisticLine text="average" value ={calculateAverage()} />
          <StatisticLine text="positive" value ={calculatePositive()} />
        </div>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)