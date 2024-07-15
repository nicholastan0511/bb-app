import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from "./components/Home"


const App = () => {

  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate replace to='/' />} />
      </Routes>
    </div>
  )
}
  
export default App