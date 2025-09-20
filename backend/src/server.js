import express from "express"
import authRoutes from "./routes/authRoutes.js"
import resumeRoutes from "./routes/resumeRoutes.js"
import geminiRoutes from "./routes/geminiRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"
import path from "path"
dotenv.config();
const app = express();
const PORT= process.env.PORT || 5001;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== 'production'){
    app.use(cors());
}

app.use(express.json({limit:'50mb'}));
app.use('/api/auth',authRoutes);
app.use('/api/resume',resumeRoutes);
app.use('/api/gemini',geminiRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("Server started on PORT 5001")
})
});
