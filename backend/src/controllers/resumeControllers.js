import Resume from "../models/Resume.js";
export async function getAllResumes(req,res) {
    try{
        const resumeDetails = await Resume.find({userId:req.params.userId});
        res.status(200).json(resumeDetails);
    }
    catch(error){
        res.status(500).json("Internal Server Error");
        console.error(error);
    }
}
export async function getOneResume(req,res) {
    try{
        const resumeDetails = await Resume.findById(req.params.id);
        res.status(200).json(resumeDetails)
    }
    catch(error){
        res.status(500).json("Internal Server Error");
        console.error(error);
    }
}
export async function addResume(req,res) {
    const{userId,companyName,jobTitle,jobDescription,score,suggestions,toneAndStyleScore,toneAndStyleTips,contentScore,contentTips,skillsScore,skillsTips,structureScore,structureTips} = req.body; 
    try{
        const newResume = new Resume({userId,companyName,jobTitle,jobDescription,score,suggestions,toneAndStyleScore,toneAndStyleTips,contentScore,contentTips,skillsScore,skillsTips,structureScore,structureTips});
        const savedResume = await newResume.save();
        res.status(201).json(savedResume);
    }
    catch(error){
        res.status(500).json("Internal Server Error");
        console.error(error);
    }
}
export async function addScore(req,res) {
    const{score,suggestions} = req.body;
    try{
        const updatedResume = await Resume.findByIdAndUpdate(req.params.id,{score,suggestions},{new:true});
        res.status(200).json(updatedResume);
    }
    catch(error){
        res.status(500).json("Internal Server Error");
        console.error(error);
    }
}
export async function deleteResume(req,res) {
    try{
        const deletedResume = await Resume.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedResume);
    }
    catch(error){
        res.status(500).json("Internal Server Error");
        console.error(error);
    }
}