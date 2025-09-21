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
    <div className="navbar bg-neutral shadow-sm text-neutral-content md:h-20 md:px-5">
        <div className="md:flex-1">
           <Link to={`/dashboard/${userId}`}><span className="md:px-5 container flex items-center text-xl md:text-2xl font-semibold"><BrainCircuit className='mr-3'/>AI Resume Analyser</span></Link>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            <li><button className='btn btn-base-100 btn-sm md:btn-md py-5 rounded-xl md:mr-3' onClick={handleclick}><CirclePlus/> Upload Resume</button></li>
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