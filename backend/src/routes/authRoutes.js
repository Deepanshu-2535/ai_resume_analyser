import express from "express"
import { addAuthDetails, deleteAuthDetails, getAuthDetails, updateAuthDetails } from "../controllers/authControllers.js";
const router = express.Router();
router.get('/:userId',getAuthDetails);
router.post('/',addAuthDetails);
router.put('/',updateAuthDetails);
router.delete('/',deleteAuthDetails);
export default router;