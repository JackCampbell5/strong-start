import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
    <h1>Strong Start</h1>
    <img src={reactLogo} className='logo react' alt='React logo' />
    </div>
  )
}

export default App
