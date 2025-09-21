import React, { useState } from 'react'
import {useNavigate} from 'react-router'
import {Eye,EyeOff} from 'lucide-react';
import api from '../lib/axios.js';
import toast from 'react-hot-toast'
const Home = ({setIsLoggedIn}) => {
    const navigate = useNavigate();
    const[userId,setUserId] = useState("");
    const[password,setPassword] = useState("");
    const[loggingIn,setLoggingIn] = useState(false);
    const[visible,setVisible] = useState(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoggingIn(true);
        try{
            if(userId === ""){
                toast.error("User Id is required");
                return;
            }
            const res = await api.get(`/auth/${userId}`)
            if(!res.data){
                toast.error("User Not Found");
                toast("Redirecting to Sign Up");
                navigate("/signup");
                return;
            }
            if(password === res.data.password){
                navigate(`/dashboard/${userId}`);
            }
            else{
                toast.error("Incorrect Password");
            }
        }
        catch(error){
            console.error(error);
        }
        finally{
            setLoggingIn(false);
            setIsLoggedIn(true);
        }
    }
    const toggleVisibility = ()=>{
        setVisible(v=>!v);
    }
  return (
    <div className='min-h-screen min-w-screen flex items-center justify-center -z-1 bg-[url("./images/background.png")]'>
        <div className='min-h-screen min-w-[60%] items-center justify-center hidden md:flex'>
            <div className='px-10'>
                <h1 className='text-7xl text-white font-sans font-bold text-center mb-7'>AI Powered Resume Analyzer</h1>
                <p className='text-white/80 font-sans font-light text-center'>We're excited to see you're continuing on your journey to land that next great opportunity. Our AI-powered analysis is ready to pick up right where you left off, providing you with the insights you need to perfect your resume and get noticed by recruiters. Let's get to work and make your resume stand out from the rest.</p>
            </div>
        </div>
        <div className='min-h-screen min-w-screen md:min-w-[40%] bg-base-100 p-10 py-28 md:p-30'>
            <div className='mb-20'>
                <div className='flex items-center justify-center md:hidden p-0 m-0'>
                    <h2 className='md:hidden mb-5 text-4xl text-center text-base-content font-sans w-80 m-0'>AI Powered Resume Analyser</h2>
                </div>
                <h2 className='text-4xl text-center md:text-left text-base-content font-sans underline'>Log In</h2>
            </div>
            <div className='m-4 md:mx-0'>
                <label className='label mb-1'>User Id</label>
                <br />
                <input type="text" className='input focus:border-none mb-3 w-full md:w-xs' onChange={(e)=>setUserId(e.target.value)} />
                <br />
                <label className='label mb-1'>Password</label>
                <br />
                <div className='input focus:border-0 mb-10 w-full md:w-xs'>
                    <input type={visible?"text":"password"} className='input focus:border-none focus:outline-none' onChange={(e)=>setPassword(e.target.value)}/>
                    <div>
                        <button className='btn btn-ghost btn-circle hover:bg-base-200/60 hover:border-0 hover:outline-0' onClick={toggleVisibility}>
                            {visible?<EyeOff className='text-base-content/50 m-0'/>:<Eye className='text-base-content/50 m-0'/>}
                        </button>
                    </div>
                </div>
                <br />
                <button className='btn btn-primary w-full md:w-xs mb-3' disabled={loggingIn} onClick={handleSubmit}>
                    {loggingIn?"Logging In...":"Log In"}
                </button>
                <br />
                <button className='btn btn-secondary w-full md:w-xs' onClick={()=>{navigate('/signup')}}>
                    Sign Up
                </button>
            </div>
        </div>
    </div>
  )
}

export default Home