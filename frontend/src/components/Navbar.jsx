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
    <div className="navbar bg-white shadow-sm text-neutral-content h-25 md:h-25 md:px-5 flex justify-between">
        <div className="md:flex-1">
           <Link to={`/dashboard/${userId}`}><span className="md:px-5 container flex items-center text-2xl text-black md:text-3xl font-semibold"><span className='font-bold text-blue-600'>Resu</span>Metrics</span></Link>
        </div>
        <div className="flex items-center">
            <button className='btn bg-blue-600 text-white btn-sm md:btn-md py-5 rounded-full md:mr-3' onClick={handleclick}><CirclePlus/> Upload Resume</button>
            <div className="dropdown dropdown-end ml-2">
                <div tabIndex={0} role="button" className="flex justify-around text-black/80 btn btn-ghost p-0"><CircleUserRound className='m-0'/><ChevronDown className='size-5 m-0'/></div>
                <ul tabIndex="-1" className="dropdown-content menu bg-white rounded-box z-1 p-2 shadow-sm">
                    <li className='text-black/80'><Link to={`/settings/${userId}`}>Settings</Link></li>
                </ul>
            </div>
            {/* <details className='dropdown dropdown-end'>
                <summary className='text-m text-black/80 btn btn-ghost p-2'><CircleUserRound/></summary>
                <ul className="bg-white text-black p-2">
                    <li><Link to={`/settings/${userId}`}>Settings</Link></li>
                </ul>
            </details> */}     
        </div>
    </div>
  )
}

export default Navbar