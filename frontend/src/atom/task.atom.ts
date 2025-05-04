import { atom } from "jotai";

export const tasksAtom = atom<unknown[]>([]);

import axios from "axios";

export const createTask = atom(null,async(get,set,taskData)=>{
    const res = await axios.post("http://localhost:3000/api/tasks/assign", taskData);
    set(tasksAtom,[...get(tasksAtom),res.data]);
});
