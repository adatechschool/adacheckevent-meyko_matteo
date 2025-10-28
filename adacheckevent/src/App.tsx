import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="">
        Click on the Vite and React logos to learn more
      </p>

      {/* Visual Tailwind test block */}
      <div className="mt-8 flex justify-center">
        <div className="max-w-lg w-full p-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-2xl">
          <h2 className="text-2xl font-bold mb-2">Test visuel Tailwind</h2>
          <p className="mb-4">Si ce bloc s'affiche avec un dégradé et du texte blanc, Tailwind fonctionne.</p>
          <div className="flex gap-3">
            <button className="bg-white text-indigo-700 px-4 py-2 rounded hover:opacity-90">Primary</button>
            <button className="bg-transparent border border-white px-4 py-2 rounded">Secondary</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
