import { PlusCircleIcon, ScrollText } from 'lucide-react'
import React from 'react'
import { Link, useParams } from 'react-router'

const NotFound = () => {
    const{userId} = useParams();
  return (
    <div>
        <div className='p-3 md:p-10'>
        <div className='p-10 md:p-20 rounded-3xl border-2 border-neutral-content/40 shadow-neutral-content/20 shadow-xl'>
            <div className='flex items-center justify-center mb-5'>
                <div className='bg-secondary-content text-primary rounded-full p-7 max-w-fit'>
                    <ScrollText className='size-10'/>
                </div>
            </div>
            <div className='text-center'>
                <div className='text-primary font-bold text-3xl mb-3'>Oops! No Resumes Found</div>
                <div className='text-primary/80 font-light text-xl mb-5'>Upload your first resume <br />
                to begin the AI powered analysis journey</div>
                <Link to ={`/create/${userId}`}>
                    <button className='btn btn-primary'><PlusCircleIcon/> Upload Resume</button>
                </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound