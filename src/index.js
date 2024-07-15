import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'
import './index.css'
import './styles/tailwind.css'
import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)