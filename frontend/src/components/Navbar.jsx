import React from 'react'
import { BrainCircuit, CirclePlus } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router'

const Navbar = () => {
    const navigate = useNavigate();
    const {userId} = useParams();
    const handleclick=()=>{
        navigate(`/create/${userId}`);
    }
  return (
    <div className="navbar bg-neutral shadow-sm text-neutral-content h-20 px-5">
        <div className="flex-1">
           <Link to={`/dashboard/${userId}`}><span className="px-5 container flex items-center text-2xl font-semibold"><BrainCircuit className='mr-3'/>AI Resume Anlyser</span></Link>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            <li><button className='btn btn-base-100 rounded-xl mr-3' onClick={handleclick}><CirclePlus/> Upload Resume</button></li>
            <li>
                <details>
                <summary className='text-m'>Account</summary>
                <ul className="bg-neutral rounded-t-none p-2">
                    <li><Link to={`/settings/${userId}`}>Settings</Link></li>
                </ul>
                </details>
            </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar