import React, { useState } from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
const App = () => {
  const[isLoggedIn,setIsLoggedIn] = useState(false);
  return (
    <Routes>
      <Route path='/' element={<Home setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route path='/signup' element={<Signup setIsLoggedIn={setIsLoggedIn} />}/>
      <Route path='/dashboard/:userId' element={<Dashboard isLoggedIn={isLoggedIn}/>}/>
    </Routes>
  )
}

export default App