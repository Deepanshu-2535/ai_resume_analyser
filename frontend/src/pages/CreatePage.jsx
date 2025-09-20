import React, { useState, useCallback } from 'react'
import {useDropzone} from 'react-dropzone'
import {FileCheck, Upload} from 'lucide-react';
import {GoogleGenAI, Type} from '@google/genai';
import api from '../lib/axios';
import { useNavigate, useParams } from 'react-router';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import toast from 'react-hot-toast';
const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]); // We only need the Base64 part
    reader.onerror = error => reject(error);
});

const CreatePage = () => {
  const ai = new GoogleGenAI({apiKey:'AIzaSyD2Nj06FTzP8ThXov_fkyKP4f0yV61F16A'});
  const {userId} = useParams();
  const[companyName,setCompanyName] = useState("");
  const[jobTitle,setJobTitle] = useState("");
  const[jobDescription,setJobDescription] = useState("");
  const[resume,setResume] = useState(null);
  const[processing,setProcessing] = useState(false);
  const navigate = useNavigate();
  const onDrop = useCallback(acceptedFiles => {
    setResume(acceptedFiles[0]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,accept:{'application/pdf' : ['.pdf']},maxSize:20*1024*1024})
  const handleAnalyse = async()=>{
    if(!companyName || !jobTitle || !jobDescription || !resume){
      toast.error("All fields are required");
    }
    try{
      setProcessing(true);
      const base64 = await fileToBase64(resume);
      const geminidata = await api.post('/gemini/',{jobTitle,jobDescription,base64});
      const analysisData = geminidata.data;
      const analysisDatajson = JSON.parse(analysisData);
      const{score,suggestions,toneAndStyleScore,toneAndStyleTips,contentScore,contentTips,skillsScore,skillsTips,structureScore,structureTips} = analysisDatajson;
      const saved = await api.post(`/resume/${userId}`,{userId,companyName,jobTitle,jobDescription,score,suggestions,toneAndStyleScore,toneAndStyleTips,contentScore,contentTips,skillsScore,skillsTips,structureScore,structureTips});
      console.log(saved);
      setProcessing(false);
      toast.success("Analysis Complete");
      navigate(`/${userId}/${saved.data._id}`);
    }
    catch(error){
      toast.error("Error Analysing Resume");
      console.error(error);
    }
    finally{
      setProcessing(false);
    }
  }
  if(processing){
    return(
      <div className='p-15'>
        <div className='p-30 rounded-2xl border-2 border-neutral-content/20 shadow-neutral-content/20 shadow-xl text-primary flex items-center justify-center'>
        <div>
          <DotLottieReact className='w-150 m-0'
            src="https://lottie.host/29d88a63-39a3-4b0d-9d6c-f2a7f27d4e83/3g30toMGfs.lottie"
            loop
            autoplay
            />
          <p className='text-primary/80 font-light m-0 text-xl text-center'>Analysing Your Resume...</p>
          <p className='text-primary/60 font-extralight m-0 text-lg text-center'>(This may take a few miniutes)</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className='text-3xl font-bold text-neutral-content font-sans text-center bg-neutral flex items-center justify-center py-6'>Upload Your Resume</div>
      <div className='py-5 p-10'>
        <div className='divider'></div>
        <div className='p-5 rounded-2xl border-2 border-neutral-content/20 shadow-neutral-content/20 shadow-xl text-primary'>
          <div className='flex items-center justify-center my-5'>
            <div className='flex items-center justify-between w-[70%] md:w-[60%] lg:w-[40%]'>
              <label className='label'>Company Name :</label>
              <input type='text' className='input focus:border-0 ml-2' onChange={(e)=>setCompanyName(e.target.value)}></input>
            </div>
          </div>
          <div className='flex items-center justify-center my-5'>
            <div className='flex items-center justify-between w-[70%] md:w-[60%] lg:w-[40%]'>
              <label className='label'>Job Title :</label>
              <input type='text' className='input focus:border-0 ml-2' onChange={(e)=>setJobTitle(e.target.value)}></input>
            </div>
          </div>
          <div className='flex items-center justify-center my-5'>
            <div className='flex items-center justify-between w-[70%] md:w-[60%] lg:w-[40%]'>
              <label className='label'>Job Descrption :</label>
              <textarea className='textarea focus:border-0 ml-2' onChange={(e)=>setJobDescription(e.target.value)}></textarea>
            </div>
          </div>
          <div className='flex items-center justify-center my-5'>
            <div className='flex items-center justify-between w-[70%] md:w-[60%] lg:w-[40%]'>
              <label className='label'>Resume :</label>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                    <div  className='w-80 textarea p-5'>
                      {
                        resume?
                          (
                            <div>
                              <div className='flex items-center justify-center'>
                                <div className='bg-neutral-content rounded-full p-5 w-fit'>
                                  <FileCheck/>
                                </div>
                              </div>
                              <div className='text-sm font-extralight text-primary/60 text-center'>
                                Click to select another file
                              </div>
                              <div className='truncate text-lg font-light text-primary/60 text-center py-0 px-5'>
                                {resume.name}
                                <br />
                                {Math.round((resume.size/(1024*1024))*100)/100} MB
                              </div>
                            </div>
                          )
                        :(
                          <div>
                            <div className='flex items-center justify-center'>
                              <div className='bg-neutral-content rounded-full p-5 flex items-center justify-center w-fit'>
                                <Upload/>
                              </div>
                            </div>
                            <div className='text-lg font-light text-primary/60 text-center pb-0 p-5'>
                              {
                                isDragActive ?
                                  <p>Drop the files here ...</p> :
                                  <p><span className='font-semibold'>Click to select </span>or drag 'n' drop
                                    <br /> <span className='font-extralight'>PDF (Max size 20MB)</span>
                                  </p>
                              }
                            </div>
                          </div>
                        )
                      }
                    </div>
                </div>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <button className='btn btn-primary' onClick={handleAnalyse}>Analyse Resume</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePage