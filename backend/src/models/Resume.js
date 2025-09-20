import mongoose from "mongoose";
const resumeSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    score:{
        type:Number
    },
    suggestions:{
        type:Array
    },
    toneAndStyleScore:{
        type:Number
    },
    toneAndStyleTips:{
        type:Array
    },
    contentScore:{
        type:Number
    },
    contentTips:{
        type:Array
    },
    structureScore:{
        type:Number
    },
    structureTips:{
        type:Array
    },
    skillsScore:{
        type:Number
    },
    skillsTips:{
        type:Array
    }
},{timestamps:true})

const Resume = mongoose.model("Resume",resumeSchema);
export default Resume;