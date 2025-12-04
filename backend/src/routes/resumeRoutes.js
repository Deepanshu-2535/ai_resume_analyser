import express from "express"
import { addResume, deleteResume, getAllResumes, getOneResume } from "../controllers/resumeControllers.js";
const router = express.Router();
router.get('/:userId',getAllResumes);
router.get('/:userId/:id',getOneResume);
router.post('/:userId',addResume);
router.delete('/:id',deleteResume);
export default router;