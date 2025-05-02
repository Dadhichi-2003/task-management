import { NextFunction } from "express"
import { admin } from "../firebase/firebase.ts";
import { Request,Response } from "express";


export const verfiyAdmin = async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
        res.status(401).json({
            message:"token is missing or invalid"
        })
    }
    try {
      const decoded = await admin.auth().verifyIdToken(token!);
      if(decoded.role !== "admin"){
        res.status(403).json({
            message:"Access denied"
        })
      }
    } catch (error:any) {
        res.status(500).json({
            error:error.message
        })
    }
}