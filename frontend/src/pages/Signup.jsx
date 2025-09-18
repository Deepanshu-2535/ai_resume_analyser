import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {Eye,EyeOff} from 'lucide-react';
import { useNavigate } from 'react-router';
import api from '../lib/axios.js';

const Signup = () => {
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
        }
    }
    const toggleVisibility = ()=>{
        setVisible(v=>!v);
    }
  return (
    <div className='min-h-screen flex items-center justify-center -z-1 bg-[url("src/images/background.png")]'>
        <div className='container mx-auto my-auto bg-base-200/60 w-3xl py-8 px-16 rounded-3xl border-2 border-accent'>
            <h2 className='text-center text-3xl text-base-content mb-5'>Sign Up</h2>
            <div className='bg-base-300/60 rounded-3xl py-8 px-28 w-full'>
                <div className='container flex items-center mb-5 justify-between w-full'>
                    <label className='label mr-6'>
                    <span className='labe-text'>User ID:</span>
                    </label>
                    <input type="text" className='input input-sm rounded-2xl' value={userId} onChange={(e)=>setUserId(e.target.value)} />
                </div>
                <div className='flex mb-5 justify-between'>
                      <label className='label mr-3'>
                      <span className='labe-text'>Password:</span>
                      </label>
                      <div className='input input-sm rounded-2xl'>
                        <input type={visible?"text":"password"} className='input input-sm rounded-2xl border-none focus:border-none focus:outline-none' value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <div className='flex items-center'>
                          <button className='btn btn-ghost btn-circle hover:bg-base-300/50 hover:outline-none hover:border-none' onClick={toggleVisibility}>
                            {visible?<EyeOff className='text-base-content/50 size-4 m-0' />:<Eye className='text-base-content/50 size-4 m-0'/>}
                          </button>
                        </div>
                      </div>
                </div>
                <div className='w-full flex items-center mb-5 justify-between'>
                    <label className='label mr-3'>
                    <span className='labe-text'>Name:</span>
                    </label>
                    <input type="text" className='input input-sm rounded-2xl' value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className='w-full flex items-center mb-5 justify-between'>
                    <label className='label mr-3'>
                    <span className='labe-text'>Email:</span>
                    </label>
                    <input type="text" className='input input-sm rounded-2xl' value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className='w-full flex items-center justify-center mt-3'>
                    <button className='btn btn-secondary btn-wide rounded-3xl text-secondary-content' disabled={signingUp} onClick={handleSubmit}>
                        {signingUp?"Signing Up...":"Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup