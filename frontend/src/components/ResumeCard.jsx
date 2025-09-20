import { Trash2Icon } from 'lucide-react';
import React from 'react'
import { Link, useParams } from 'react-router'
import { formatDate } from '../lib/util.js';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import ScoreCircle from './ScoreCircle';

const ResumeCard = ({resume,setResumes}) => {
    const {userId}= useParams();

    const handleDelete = async(e)=>{
        e.preventDefault();
        try{
            await api.delete(`/resume/${resume._id}`)
            toast.success("Resume Successfully Deleted");
            setResumes((prev)=>prev.filter(temp=>temp._id!==resume._id));
        }
        catch(error){
            toast.error("Error Deleting");
            console.error(error)
        }
    }
  return (
    <Link to={`/${userId}/${resume._id}`}>
        <div className='card p-5 rounded-2xl border-2 border-neutral-content/20 shadow-neutral-content/20 shadow-xl text-primary'>
            <div className='flex items-center justify-between'>
            <span className='font-bold font-sans text-2xl'>{resume.companyName}</span>
            <ScoreCircle score={resume.score}/>
            </div>
            <div className='divider'></div>
            <div className='text-primary/70 line-clamp-3'>
                {resume.jobTitle}
                <br />
                {resume.jobDescription}
            </div>
            <div className='card-actions items-center text-primary/70 justify-between p-0'>
                <span>{formatDate(new Date(resume.createdAt))}</span>
                <button className='btn btn-ghost text-red-600/70 hover:text-red-800/70 m-0' onClick={handleDelete}><Trash2Icon className='m-0 size-5'/></button>
            </div>
        </div>
    </Link>
  )
}

export default ResumeCard