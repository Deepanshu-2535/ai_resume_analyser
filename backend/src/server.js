import express from "express"
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
const app = express();
const PORT= process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("Server started on PORT 5001")
})
});
