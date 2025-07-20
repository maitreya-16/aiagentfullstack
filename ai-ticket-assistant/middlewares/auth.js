import jwt from "jsonwebtoken"


export const authenticate = (req,res,next)=>{
    console.log("Middleware")
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({error : "Access Denied. No Token found."})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next();
    } catch (error) {   
        console.log("No token");
    }
}
