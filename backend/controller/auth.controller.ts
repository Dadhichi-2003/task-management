import { admin, db } from "../firebase/firebase.ts";
import { UserPayloadType } from "../models/user.type";
import { Request,Response } from "express";
import dotenv from "dotenv";
dotenv.config();


export const signup = async(req:Request,res:Response)=>{
  
  try {
    const {username,email,password,tech}= req.body as unknown as UserPayloadType;
    const adminEmail = process.env.ADMIN_EMAIL;
    console.log("payload email",email);
    console.log("adminEmail",adminEmail);
    const role = adminEmail=== email ? "admin":"user";
    console.log("role",role);
    
    if(!username || !email || !password || !tech){
      return res.status(400).json({
        status:false,
        message:"All fields are required"
      })
    }    

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName:username
    });

    await admin.auth().setCustomUserClaims(userRecord.uid,{role});
    const user1 = await admin.auth().getUser(userRecord.uid);
    console.log("setrole",user1.customClaims);
    
    const user = await admin.auth().getUser(userRecord.uid);
    console.log("Custom claims set in Firebase Auth:", user.customClaims);

    const userData:UserPayloadType = {
      uid:userRecord.uid,
      username,
      email,
      tech,
      role
    }

    if(role !== "admin"){
      userData.assignedTasks =[],
      userData.completedTasks = []
    }

    await db.collection("employees").doc(userRecord.uid).set(
      {
        userData
      }
    )

    res.status(200).json({
      status:true,
      message:"Employee Added"
    })
  } catch (error:any) {
    res.status(500).json({
      error:error.message
    })
  }
}

export const removeEmployee = async(req:Request,res:Response)=>{
  try {
    const {uid} = req.params as unknown as UserPayloadType;
    await admin.auth().deleteUser(uid!);
    await db.collection("employees").doc(uid!).delete();
    res.status(200).json({
      message:"Remove Successfully"
    })
  } catch (error:any){
    res.status(500).json({
      error:error.message
    })
  }
}

export const getAllEmployee = async(req:Request,res:Response)=>{
  try {
    const snapshot = await db.collection('employees').get();
    const employees = snapshot.docs.map((doc)=>({
      id:doc.id,
      ...doc.data()
    }));
    res.status(200).json(employees);
  } catch (error:any) {
    res.status(500).json({error:error.message})
  }
}