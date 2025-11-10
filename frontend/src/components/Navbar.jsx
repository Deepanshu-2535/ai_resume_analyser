import React from 'react'
import {CircleUserRound ,CirclePlus, ChevronDown } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router'

const Navbar = () => {
    const navigate = useNavigate();
    const {userId} = useParams();
    const handleclick=()=>{
        navigate(`/create/${userId}`);
    }
  return (
    <div>
        <div className="navbar bg-white shadow-sm text-neutral-content h-25 md:px-5 flex justify-between fixed z-40">
            <div className="md:flex-1">
            <Link to={`/dashboard/${userId}`}><span className="md:px-5 container flex items-center text-2xl text-black md:text-3xl font-semibold"><span className='font-bold text-blue-600'>Resu</span>Metrics</span></Link>
            </div>
            <div className="flex items-center">
                <button className='btn bg-blue-600 text-white btn-sm md:btn-md py-5 rounded-full md:mr-3' onClick={handleclick}><CirclePlus/> Upload Resume</button>
                <div className="dropdown dropdown-end ml-2 rounded-full">
                    <div tabIndex={0} role="button" className="flex justify-around text-black/80 btn btn-ghost p-0"><CircleUserRound className='m-0'/><ChevronDown className='size-5 m-0'/></div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-white rounded-box z-1 p-2 shadow-sm">
                        <li className='text-black/80'><Link to={`/settings/${userId}`}>Settings</Link></li>
                    </ul>
                </div>  
            </div>
        </div>
        <div className='h-25 bg-white'></div>
    </div>
  )
}

export default Navbar