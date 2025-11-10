import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../lib/axios.js'
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import ResumeCard from '../components/ResumeCard.jsx';
import NotFound from '../components/NotFound.jsx';
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'


const Dashboard = ({isLoggedIn}) => {
  const {userId} = useParams();
  const [resumes,setResumes] = useState([]);
  const [userName,setUserName] = useState("");
  const[loading,setLoading] = useState(true);
  const navigate = useNavigate();
/*   useEffect(()=>{
    if(!isLoggedIn){
      navigate('/')
    }
  },[userId]) */
  useEffect(()=>{
    async function getResumes(){
      try{
        const res = await api.get(`/resume/${userId}`)
        setResumes(res.data);
      }
      catch(error){
        toast.error("Error Fetching Resumes");
        console.error(error);
      }
      finally{setLoading(false)};
    }
    getResumes();
  },[userId])
  useEffect(()=>{
    async function getDetails() {
      try{
        const res = await api.get(`/auth/${userId}`);
        setUserName(res.data.name);
      }
      catch(error){
        console.error(error);
      }
    }
    getDetails();
  },[userId])
  if(loading){
    return(
      <div>
        <Navbar/>
        <div className='p-10 bg-gradient-to-br from-blue-100 to-pink-100'>
          <div className='p-10 bg-white min-h-screen rounded-3xl border-2 border-neutral-content/40 shadow-neutral-content/20 shadow-xl flex items-center justify-center py-30'>
            <div className='text-center bg-white'>
              <Ring/>
              <p className='text-primary/70 font-light'>Fetching Resumes...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if(resumes.length===0){
    return(
      <div className='bg-gradient-to-br from-blue-100 to-pink-100 min-h-screen'>
        <Navbar/>
        <NotFound/>
      </div>
    )
  }
  return (
    <div>
      <Navbar/>
      <div className='p-2 md:p-10 bg-gradient-to-br from-blue-100 to-pink-100 min-h-screen'>
        <div className='m-5 md:m-10 ml-0'>
          <span className='ml-5 text-3xl font-bold text-primary'>Hello {userName}</span>
        </div>
        <div className='p-5 md:p-10 rounded-3xl border-2 border-neutral-content/40 shadow-neutral-content/20 shadow-xl bg-white '>
          <span className='ml-3 text-2xl font-semibold text-primary'>Your Saved Resumes</span>
          <div className='divider'></div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {resumes.map(resume=><ResumeCard key={resume._id} resume={resume} setResumes={setResumes}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard