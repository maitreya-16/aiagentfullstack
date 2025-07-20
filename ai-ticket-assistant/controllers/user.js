import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import { inngest } from "../ingest/client.js"

export const signup = async (req, res) => {
    const { email, password, skills = [] } = req.body
    try {
        console.log(email,password);
        const hashed = await bcrypt.hash(password, 10)
        console.log("hashing",hashed)
        const user = await User.create({ email, password: hashed, skills });
        console.log("user",user);
        //Fire ingest event 
        await inngest.send({
            name: "user/signup",
            data: {
                email
            }
        });

        const token =  jwt.sign({
            _id: user._id, role: user.role
        }, process.env.JWT_SECRET);
        return res.status(200).json({ user, token });
    } catch (error) {
        return res.status(500).json({ error: "Sign Up failed ", details: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(401).json({ error: "Invalid Credentials" });
        }

        const token =  jwt.sign({
            _id: user._id, role: user.role
        }, process.env.JWT_SECRET);
        console.log("Logging In ")
        return res.json({ user, token });


    } catch (error) {
        res.json(500).json({ error: "Login failed ", details: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.headers.authorizations.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Unauthorized" })
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err)return res.status(401).json({error:"Unauthorized"})
                res.json({message:"Logout Successfully"});
        })
    } catch (error) {
        res.json(500).json({ error: "Logout failed ", details: error.message })
    }
}

export const updateUser = async (req,res)=>{
    const {skills= [],role , email} = req.body
    try {
        if(req.user?.role!== "admin"){
            return res.status(403).json({error:"Forbidden"})
        }
        const user = User.findOne({email});
        if(!user)return res.status(401).json({error:"User not found"})

        await User.updateOne(
            {email},
            {skills:skills.length ? skills  : user.skills , role}
        )
        return res.json({message:"user updated successfully "})
    } catch (error) {
        res.json(500).json({ error: "Update failed ", details: error.message })
    }
}

export const getUsers = async(req,res)=>{
    try {
        if(req.user?.role!== "admin"){
            return res.status(403).json({error:"Forbidden"})
        }
        const users = await User.find().select("-password");
        return res.json(users);
    } catch (error) {
        res.json(500).json({ error: "Get failed ", details: error.message })
    }
}