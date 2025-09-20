import React, { useState } from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CreatePage from './pages/CreatePage'
import DetailPage from './pages/DetailPage'
import Settings from './pages/Settings'
const App = () => {
  const[isLoggedIn,setIsLoggedIn] = useState(false);
  return (
    <Routes>
      <Route path='/' element={<Home setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route path='/signup' element={<Signup setIsLoggedIn={setIsLoggedIn} />}/>
      <Route path='/dashboard/:userId' element={<Dashboard isLoggedIn={isLoggedIn}/>}/>
      <Route path='/create/:userId' element={<CreatePage/>}/>
      <Route path='/:userId/:id' element={<DetailPage/>} />
      <Route path='/settings/:userId' element={<Settings/>} />
    </Routes>
  )
}

export default App