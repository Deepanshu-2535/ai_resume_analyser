import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Trash2,Eye,EyeOff } from 'lucide-react'
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { useNavigate, useParams } from 'react-router';
const Settings = () => {
    const[curr,setCurr] = useState("");
    const [newpass,setNewpass] = useState("");
    const [loading,setLoading] = useState(false);
    const [currvisible,setCurrvisible] = useState(false);
    const [newvisible,setNewvisible] = useState(false);
    const {userId} = useParams();
    const navigate = useNavigate();
    const handleChange = async()=>{
        setLoading(true);
        if(!curr || !newpass){
            toast.error("All fields are required");
            setLoading(false);
            return;
        }
        try{
            const res = await api.get(`/auth/${userId}`);
            const{password} = res.data;
            if(password != curr){
                toast.error("Wrong Password");
                setLoading(false);
                return;
            }
            await api.put('/auth/',{userId,password:newpass});
            toast.success("Password Changed");
        }
        catch(error){
            toast.error("Error");
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    }
    const handleDelete = async()=>{
        if(!window.confirm("Are you sure")){
            return;
        }
        setLoading(true);
        await api.delete(`/auth/${userId}`);
        setLoading(false);
        toast.success("Account Deleted");
        navigate('/');
    }
    const toggleCurrVisibility = ()=>{
        setCurrvisible(v=>!v);
    }
    const toggleNewVisibility = ()=>{
        setNewvisible(v=>!v);
    }
  return (
    <div>
        <Navbar/>
        <div className='p-5 md:p-15 bg-gradient-to-br from-blue-100 to-pink-100'>
            <div className='bg-white p-10 md:p-20 rounded-3xl border-2 border-neutral-content/40 shadow-neutral-content/20 shadow-xl'>
                <h3 className='text-2xl text-primary text-left font-bold'>Change Password</h3>
                <div className='divider'></div>
                <div className='md:w-fit'>
                <label className='label text-lg m-1 md:m-3'>Current Password : </label>
                <div className='input focus:border-0 m-1 md:m-3 w-full md:w-xs'>
                    <input type={currvisible?"text":"password"} className='input focus:border-none focus:outline-none' onChange={(e)=>setCurr(e.target.value)}/>
                    <div>
                        <button className='btn btn-ghost btn-circle hover:bg-base-200/60 hover:border-0 hover:outline-0' onClick={toggleCurrVisibility}>
                            {currvisible?<EyeOff className='text-base-content/50 m-0'/>:<Eye className='text-base-content/50 m-0'/>}
                        </button>
                    </div>
                </div>
                <br />
                <label className='label text-lg m-1 md:m-3'>New Password : </label>
                <div className='input focus:border-0 md:ml-9 m-1 md:m-3 w-full md:w-xs '>
                    <input type={newvisible?"text":"password"} className='input focus:border-none focus:outline-none' onChange={(e)=>setNewpass(e.target.value)}/>
                    <div>
                        <button className='btn btn-ghost btn-circle hover:bg-base-200/60 hover:border-0 hover:outline-0' onClick={toggleNewVisibility}>
                            {newvisible?<EyeOff className='text-base-content/50 m-0'/>:<Eye className='text-base-content/50 m-0'/>}
                        </button>
                    </div>
                </div>
                <br />
                <button className='btn bg-blue-600 text-white rounded-full m-1 my-3 md:m-3' disabled={loading} onClick={handleChange}>Change Password</button>
                </div>
                <h3 className='text-2xl text-primary text-left font-bold mt-10'>Delete Account</h3>
                <div className='divider'></div>
                <button className='btn btn-error rounded-full btn-soft m-1 md:m-3' disabled={loading} onClick={handleDelete}><Trash2 className='text-red-600/80'/>Delete Account</button>
            </div>
        </div>
    </div>
  )
}

export default Settings