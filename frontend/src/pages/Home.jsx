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
            toast.error("Error Logging In");
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
    <div className='min-h-screen min-w-screen flex items-center justify-center -z-1 bg-[url("./images/login-new.png")] bg-cover'>
        <div className='min-h-screen min-w-[60%] items-center justify-center hidden md:flex'>
            <div className='px-10'>
                <h1 className='text-7xl text-black font-sans text-center mb-3'><span className='font-bold text-blue-600'>Resu</span>Metrics</h1>
                <p className='text-black/80 font-sans text-xl text-center'>AI-Powered Career Insights</p>
            </div>
        </div>
        <div className='min-h-screen min-w-screen flex items-center justify-center md:min-w-[40%] p-5 py-28 md:p-0'>
            <div className='md:px-20 px-5 md:py-30 py-20 pt-15 bg-white rounded-4xl shadow-2xl'>
                <div className='mb-15'>
                    <div className='flex items-center justify-center md:hidden p-0 m-0'>
                        <h2 className='md:hidden mb-10 text-4xl text-center text-base-content font-sans w-80 m-0'><span className='font-bold text-blue-600'>Resu</span>Metrics</h2>
                    </div>
                    <h2 className='text-4xl text-center md:text-left text-base-content font-[Montserrat] font-semibold'>Log In</h2>
                </div>
                <div className='m-4 md:mx-0'>
                    <label className='label mb-1 font-[montserrat] text-sm'>User Id</label>
                    <br />
                    <input type="text" className='input focus:border-none mb-3 w-full md:w-xs rounded-full' onChange={(e)=>setUserId(e.target.value)} />
                    <br />
                    <label className='label mb-1 font-[montserrat] text-sm'>Password</label>
                    <br />
                    <div className='input focus:border-0 mb-10 rounded-full w-full md:w-xs'>
                        <input type={visible?"text":"password"} onChange={(e)=>setPassword(e.target.value)}/>
                        <div>
                            <button className='btn btn-ghost btn-circle hover:bg-base-200/60 hover:border-0 hover:outline-0' onClick={toggleVisibility}>
                                {visible?<EyeOff className='text-base-content/50 m-0'/>:<Eye className='text-base-content/50 m-0'/>}
                            </button>
                        </div>
                    </div>
                    <br />
                    <button className='btn bg-blue-600 text-white w-full md:w-xs mb-3 rounded-full' disabled={loggingIn} onClick={handleSubmit}>
                        {loggingIn?"Logging In...":"Log In"}
                    </button>
                    <br />
                    <button className='btn bg-white rounded-full border-black w-full md:w-xs' onClick={()=>{navigate('/signup')}}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Home