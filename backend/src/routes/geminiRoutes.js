import express from "express";
const router = express.Router();
import {GoogleGenAI, Type} from '@google/genai'
import dotenv from 'dotenv'
dotenv.config();
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
router.post('/',async (req,res)=>{
  try{
    console.log("req recieved");
    const{jobTitle,jobDescription,base64} = req.body;
    const contents = [
      { text: `You are an expert in ATS (Applicant Tracking System) and resume analysis.
        Please analyze and rate this resume and suggest how to improve it.
        The rating can be low if the resume is bad.
        Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
        If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
        If available, use the job description for the job user is applying to to give more detailed feedback.
        If provided, take the job description into consideration.
        The job title is: ${jobTitle}
        The job description is: ${jobDescription}
        in the response provide an ATS score, provide general suggestions, then provide seperate scores and tips under the following headings
        tone and style ,content, structure, skills.
        Remember to not any special characters like *,$,% etc in the response it should only contain alphabets,numbers and basic punctuations like , . etc.
        Remember all the scores are out of 100`
      },
      {
        inlineData: {
          mimeType: 'application/pdf',
          data: base64
        }
      }
    ]
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config:{
        responseMimeType:"application/json",
        responseSchema:{
          type: Type.OBJECT,
          properties:{
            score:{
              type:Type.NUMBER
            },
            suggestions:{
              type:Type.ARRAY,
              items:{
                type:Type.STRING
              }
            },
            toneAndStyleScore :{
              type:Type.NUMBER
            },
            toneAndStyleTips:{
              type:Type.ARRAY,
              items:{
                type:Type.STRING
              }
            },
            contentScore :{
              type:Type.NUMBER
            },
            contentTips:{
              type:Type.ARRAY,
              items:{
                  type:Type.STRING
              }
            },
            structureScore :{
              type:Type.NUMBER
            },
            structureTips:{
              type:Type.ARRAY,
              items:{
                  type:Type.STRING
              }
            },
            skillsScore :{
              type:Type.NUMBER
            },
            skillsTips:{
              type:Type.ARRAY,
              items:{
                  type:Type.STRING
              }
            }
          }
        }
      }
    });
    res.json(response.text);
  }
  catch(error){
    res.status(500).json({message:"Internal Server Error"});
  } 
})
export default router;