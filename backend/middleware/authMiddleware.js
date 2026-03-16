import jwt from "jsonwebtoken"

export default function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "Token not found"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin=decoded;
        next();
    } catch (error) {
        console.log("JWT Error:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
}