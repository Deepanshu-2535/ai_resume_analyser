import React, { useState } from 'react'
import {useNavigate} from 'react-router'
import {Eye,EyeOff} from 'lucide-react';
import api from '../lib/axios.js';
import toast from 'react-hot-toast'
import axios from 'axios';
const Home = () => {
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
        }
    }
    const toggleVisibility = ()=>{
        setVisible(v=>!v);
    }
  return (
    <div className='min-h-screen flex items-center justify-center -z-1 bg-[url("src/images/background.png")]'>
        <div className='container mx-auto my-auto bg-base-200/60 w-3xl py-8 px-16 rounded-3xl border-2 border-accent'>
            <h2 className='text-center text-3xl text-base-content mb-5'>Login</h2>
            <div className='bg-base-300/60 rounded-3xl py-8 px-28'>
                <div className='w-full flex items-center mb-5 justify-between'>
                    <label className='label mr-6'>
                    <span className='labe-text'>User ID:</span>
                    </label>
                    <input type="text" className='input input-sm rounded-2xl' onChange={(e)=>setUserId(e.target.value)} />
                </div>
                <div className='w-full flex items-center justify-between'>
                    <label className='label mr-3'>
                    <span className='labe-text'>Password:</span>
                    </label>
                    <div className='input input-sm rounded-2xl'>
                        <input type={visible?"text":"password"} className='input input-sm rounded-2xl border-none focus:border-none focus:outline-none' onChange={(e)=>setPassword(e.target.value)} />
                        <div className='flex items-center'>
                          <button className='btn btn-ghost btn-circle hover:bg-base-300/50 hover:outline-none hover:border-none' onClick={toggleVisibility}>
                            {visible?<EyeOff className='text-base-content/50 size-4 m-0' />:<Eye className='text-base-content/50 size-4 m-0'/>}
                          </button>
                        </div>
                      </div>
                </div>
                <div className='w-full flex items-center justify-center mt-5'>
                    <button className='btn btn-primary btn-wide rounded-3xl text-primary-content' disabled={loggingIn} onClick={handleSubmit}>
                        {loggingIn?"Logging In...":"Log In"}
                    </button>
                </div>
                <div className='w-full flex items-center justify-center mt-3'>
                    <button className='btn btn-secondary btn-wide rounded-3xl text-secondary-content' onClick={()=>{navigate('/signup')}}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home