import { cookieName, saltRounds } from "../constants/index.js";
import User from "../models/auth.js";
import bcrypt from "bcrypt"
import authServices from "../services/authServices.js";
import jwt from "jsonwebtoken"
class AuthController{
    async register(req,res){
            try {
                const {email,password,username} = req.body
                if(!email || !password || !username){
                    return res.json({message:"There is a missing field"})
                }
                const existingUser = await User.findOne({email})
                if(existingUser)
                {
                    return res.json({message:"There is a user that already existed"})
                }
                const hashedPassword = await bcrypt.hash(password,saltRounds)
                const newUser = new User({email,username,password:hashedPassword})
                await newUser.save()
             
                if(!newUser)
                    {
                        return res.json({message:"There is a problem in creating user"}
                        )
                    } 
                    return res.json({newUser,message:"User is created successfully"})
            } catch (error) {
                console.log(error)
                 return res.json({json:"Server error"})
            }
    }
    async login(req,res){
        try {
            const {username,password} = req.body
            if(!username || !password)
            {
                return res.json({message:"Missing fields like username or password"})
            }
            const existingUser = await authServices.findOne({username})
            
            if(!existingUser){
                return res.json({message:"User is not found"})

            }
            const hashedPassword = existingUser.password
            const isPasswordCorrect =  bcrypt.compare(password,hashedPassword)
            if(!isPasswordCorrect)
            {
                return res.json({message:"Password is not correct"})
            }
            const tokenPayload ={id:existingUser._id,username:existingUser.username}
            const token = jwt.sign({tokenPayload},process.env.jwtSecret,{expiresIn:"1h"})
            if(!token)
                return res.json("Error in creating token")
            
            res.cookie(cookieName,token,{httOnly:true,maxAge: 24 * 60 * 60 * 1000,sameSite:"lax"})
            return res.json({message:"Login is successfull",existingUser})
        } catch (error) {
              console.log(error)
                 return res.json({json:"Server error"})
        }
    }
}
export default new AuthController();