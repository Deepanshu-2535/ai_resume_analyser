import Auth from "../models/Auth.js";
export async function getAuthDetails(req,res){
    try{
        const authDetails = await Auth.findOne({userId:req.params.userId});
        res.status(200).json(authDetails);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
        console.error(error);
    }
}

export async function addAuthDetails(req,res){
    try{
        const {userId,password,name,email} = req.body;
        const newAuth = new Auth({userId,password,name,email});
        const savedAuth = await newAuth.save();
        res.status(201).json(savedAuth);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function updateAuthDetails(req,res) {
    try{
        const {userId,password} = req.body;
        const updatedAuth = await Auth.findOneAndUpdate({userId},{password},{new:true});
        if(!updatedAuth){
            res.status(404).json({message:"User not found"});
        }
        else{
            res.status(200).json(updatedAuth);
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function deleteAuthDetails(req,res) {
    try{
        const {userId} = req.params;
        const deletedUser = await Auth.findOneAndDelete({userId});
        if(!deletedUser){
            res.status(404).json({message:"User not found"});
        }
        else{
            res.status(200).json(deletedUser);
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}