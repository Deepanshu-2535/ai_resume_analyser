import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {Eye,EyeOff} from 'lucide-react';
import { useNavigate } from 'react-router';
import api from '../lib/axios.js';

const Signup = ({setIsLoggedIn}) => {
    const[userId,setUserId] = useState("");
    const[password,setPassword] = useState("");
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[signingUp,setSigningUp] = useState(false);
    const[visible,setVisible]=useState(false);
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setSigningUp(true);
        if(!userId || !password || !name || !email){
            toast.error("All fields are required");
            setSigningUp(false);
            return;
        }
        try{
            const alr = await api.get(`/auth/${userId}`);
            if(alr.data){
                toast.error('User Already Exists');
                setSigningUp(false);
                return;
            }
        }
        catch(error){
            toast.error('Error Signing Up');
            console.error(error);
            setSigningUp(false);
            return;
        }
        try{
            const res = await api.post('/auth',{userId,password,name,email});
            if(!res){
                toast.error("Error Signing Up");
                setSigningUp(false);
                return;
            }
            navigate(`/dashboard/${userId}`);
        }
        catch(error){
            console.error(error);
            toast.error("Error Signing Up");
            setSigningUp(false);
            return;
        }
        finally{
            setSigningUp(false);
            setIsLoggedIn(true);
        }
    }
    const toggleVisibility = ()=>{
        setVisible(v=>!v);
    }
  return (
    <div className='min-h-screen flex items-center justify-center -z-1 bg-[url("src/images/background.png")]'>
            <div className='min-h-screen min-w-[60%] items-center justify-center hidden md:flex'>
                <div className='px-10'>
                    <h1 className='text-7xl text-white font-sans font-bold text-center mb-7'>Sign up</h1>
                    <p className='text-white/80 font-sans font-light text-center'>Join thousands of professionals who are landing their dream jobs. Our AI resume analyzer provides instant, personalized feedback to help you stand out. Sign up today and get your free resume analysis!</p>
                </div>
            </div>
            <div className='min-h-screen min-w-screen md:min-w-[40%] bg-base-100 p-10 py-28 md:p-30'>
                <div className='mb-20'>
                    <h2 className='text-4xl text-left text-base-content font-sans underline mx-4 md:mx-0'>Sign Up</h2>
                </div>
                <div className='mx-4 md:mx-0'>
                    <label className='label mb-1'>User Id</label>
                    <br />
                    <input type="text" className='input focus:border-none mb-3 w-full md:w-xs' onChange={(e)=>setUserId(e.target.value)}/>
                    <br />
                    <label className='label mb-1'>Password</label>
                    <br />
                    <div className='input focus:border-0 mb-3 w-full md:w-xs'>
                        <input type={visible?"text":"password"} className='input focus:border-none focus:outline-none' onChange={(e)=>setPassword(e.target.value)}/>
                        <div>
                            <button className='btn btn-ghost btn-circle hover:bg-base-200/60 hover:border-0 hover:outline-0' onClick={toggleVisibility}>
                                {visible?<EyeOff className='text-base-content/50 m-0'/>:<Eye className='text-base-content/50 m-0'/>}
                            </button>
                        </div>
                    </div>
                    <br />
                    <label className='label mb-1'>Name</label>
                    <br />
                    <input type="text" className='input focus:border-none mb-3 w-full md:w-xs' onChange={(e)=>setName(e.target.value)}/>
                    <br />
                    <label className='label mb-1'>Email Id</label>
                    <br />
                    <input type="text" className='input focus:border-none mb-10 w-full md:w-xs' onChange={(e)=>setEmail(e.target.value)}/>
                    <br />
                    <button className='btn btn-primary w-full md:w-xs mb-3' disabled={signingUp} onClick={handleSubmit}>
                        {signingUp?"Signing Up...":"Sign up"}
                    </button>
                </div>
            </div>
        </div>
  )
}

export default Signup