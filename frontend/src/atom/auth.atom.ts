import axios from "axios";
import {  signInWithEmailAndPassword, User } from "firebase/auth";
import { atom } from "jotai";
import { auth } from "../firebase/firebase";


interface UserType{
    key:string;
    username:string;
    email:string;
}
interface EmployeeType{
    id:string;
    userData:{
        username:string;
        email:string;
        role:string;
    }
}

export const authUserAtom = atom<User | null>(null);
export const userListAtom = atom<UserType[]>([]);
export const tokenAtom = atom<string | null>(null);



export const loginAtom = atom(
    null,
    async(get,set,{email,password}:{email:string;  password:string})=>{
        const user = await  signInWithEmailAndPassword(auth,email,password);
        const token = await user.user.getIdToken();
        set(tokenAtom,token);
        set(authUserAtom,user.user);
    }
)


export const signupAtom = atom(
    null,
    async(get,_set,{username,email,password,tech}:{username:string;email:string;password:string;tech:string})=>{
        await axios.post("http://localhost:3000/api/users/create",{
            username,email,password,tech
        })
    }
);


export const fetchUserAtom = atom(null,
    async(get,set)=>{
        const token = get(tokenAtom);
        const res = await axios.get("http://localhost:3000/api/users/all",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        const employees = res.data.filter((emp:EmployeeType)=>emp.userData.role !== 'admin')
        .map((emp:EmployeeType)=>({
            key:emp.id,
            username:emp.userData.username,
            email:emp.userData.email,
        }));
        set(userListAtom,employees);
    }
)

export const removeUserAtom = atom(
    null,async(get,set,uid:string)=>{
        const token = get(tokenAtom);
        await axios.delete(`http://localhost:3000/api/users/remove/${uid}`,{
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':'application/json'
            }
        });
        const updatedUsers = get(userListAtom).filter((user)=>user.key !== uid);
        set(userListAtom,updatedUsers);
    }
)