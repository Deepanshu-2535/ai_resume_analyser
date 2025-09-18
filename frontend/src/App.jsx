import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard/:userId' element={<Dashboard/>}/>
    </Routes>
  )
}

export default App