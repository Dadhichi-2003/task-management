import axios from "axios";
import { atom } from "jotai";

interface User{
    uid:string,
    username:string;
    email:string;
    password:string;
    tech:string;
    assignedTasks?:any[];
    completedTask?:any[],
    createdAt:string;
}

export const employeeAtom = atom<User[]>([]);

export const fetchEmployees = atom(
    null,
    async(get,set)=>{
        try {
            const res = await axios.get("http://localhost:3000/api/user/allusers");
            console.log("apidata",res.data.users);
            set(employeeAtom,res.data.users);
        } catch (error:any) {
            console.error(error.message);
        }
    }
)
