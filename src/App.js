import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from "./components/Home"
import VersePage from "./components/VersePage"

const App = () => {

  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate replace to='/' />} />
        <Route path='/verse' element={<VersePage />}/>
      </Routes>
    </div>
  )
}
  
export default App