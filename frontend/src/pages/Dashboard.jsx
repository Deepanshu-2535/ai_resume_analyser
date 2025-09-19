import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Dashboard = ({isLoggedIn}) => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/')
    }
  },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard