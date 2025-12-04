import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import ScoreCircle from '../components/ScoreCircle';
import { ArrowLeft, ChevronRight, CircleChevronRight, LoaderCircle } from 'lucide-react';
import Badge from '../components/Badge';

const DetailPage = () => {
  const[resume,setResume] = useState(null);
  const[loading,setLoading] = useState(true);
  const {userId,id} = useParams();
  useEffect(()=>{
    async function getResume() {
      try{
        const res = await api.get(`/resume/${userId}/${id}`);
        setResume(res.data);
      }
      catch(error){
        toast.error("Error Fetching Resumes");
        console.error(error);
      }
      finally{
        setLoading(false);
      }
    }
    getResume();
  },[userId,id])
  if(loading){
    return(
      <div className='bg-gradient-to-br from-blue-100 to-pink-100 min-h-screen'>
        <Navbar/>
        <div className='p-10'>
          <div className='bg-white p-10 rounded-3xl border-2 border-neutral-content/40 shadow-neutral-content/20 shadow-xl flex items-center justify-center py-30'>
            <div className='text-center'>
              <Ring/>
              <p className='text-primary/70 font-light'>Fetching Resumes...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='bg-gradient-to-br from-blue-100 to-pink-100'>
      <Navbar />
      <div><Link to={`/dashboard/${userId}`}><button className='btn btn-ghost text-primary text-lg m-3 md:mb-0 md:ml-15 md:m-5'><ArrowLeft/> Back to resumes</button></Link></div>
      <div className='pt-3 p-3 md:p-15'>
        <div className='p-3 md:p-10 rounded-3xl border-2 bg-white border-neutral-content/40 shadow-neutral-content/20 shadow-xl'>
          <div className='flex justify-between items-center'>
            <div className='text-4xl font-bold text-primary'>
              {
                resume.companyName?resume.companyName:"loading"
              }
            </div>
            <div>
              <ScoreCircle score={resume.score}/>
            </div>
          </div>
          <div className='divider'></div>
          <span className='text-lg font-semibold text-primary/80'>Suggestions</span>
          <ul className='list'>
            {resume.suggestions.map((s,i)=>(<li className='py-3 list-row text-neutral text-sm' key={i}><ChevronRight className='text-primary size-5'/>{s}</li>))}
          </ul>
          <div className="collapse bg-base-100 border-neutral-content/70 border my-2 md:m-3 shadow-lg">
            <input type="checkbox" />
            <div className="text-primary font-bold text-2xl collapse-title flex justify-between items-center px-5 md:px-10"><span>Tone and Style <Badge score={resume.toneAndStyleScore}/></span> <ScoreCircle score={resume.toneAndStyleScore}/></div>
            <div className="collapse-content text-sm">
              <ul className='list'>
                {resume.toneAndStyleTips.map((s,i)=>(<li className='py-3 list-row text-neutral text-sm' key={i}><ChevronRight className='text-primary size-5'/>{s}</li>))}
              </ul>
            </div>
          </div>
          <div className="collapse bg-base-100 border-neutral-content/70 border my-2 md:m-3 shadow-lg">
            <input type="checkbox" />
            <div className="text-primary font-bold text-2xl collapse-title flex justify-between items-center px-5 md:px-10"><span>Content <Badge score={resume.contentScore}/> </span> <ScoreCircle score={resume.contentScore}/></div>
            <div className="collapse-content text-sm">
              <ul className='list'>
                {resume.contentTips.map((s,i)=>(<li className='py-3 list-row text-neutral text-sm' key={i}><ChevronRight className='text-primary size-5'/>{s}</li>))}
              </ul>
            </div>
          </div>
          <div className="collapse bg-base-100 border-neutral-content/70 border my-2 md:m-3 shadow-lg">
            <input type="checkbox" />
            <div className="text-primary font-bold text-2xl collapse-title flex justify-between items-center px-5 md:px-10"><span>Skills <Badge score={resume.skillsScore}/></span> <ScoreCircle score={resume.skillsScore}/></div>
            <div className="collapse-content text-sm">
              <ul className='list'>
                {resume.skillsTips.map((s,i)=>(<li className='py-3 list-row text-neutral text-sm' key={i}><ChevronRight className='text-primary size-5'/>{s}</li>))}
              </ul>
            </div>
          </div>
          <div className="collapse bg-base-100 border-neutral-content/70 border my-2 md:m-3 shadow-lg">
            <input type="checkbox" />
            <div className="text-primary font-bold text-2xl collapse-title flex justify-between items-center px-5 md:px-10"><span>Structure <Badge score={resume.structureScore} /></span> <ScoreCircle score={resume.structureScore}/></div>
            <div className="collapse-content text-sm">
              <ul className='list'>
                {resume.structureTips.map((s,i)=>(<li className='py-3 list-row text-neutral text-sm' key={i}><ChevronRight className='text-primary size-5'/>{s}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPage