import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-10 text-red-800">React + TypeScript + Tailwind CSS</h1>
    </>
  )
}

export default App
