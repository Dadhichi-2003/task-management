import { Request,Response } from "express"
import { db,admin } from "../firebase/firebase.ts";


export const createTaskAndAssign = async (req: Request, res: Response) => {
  const { title, taskDescription, assignedTo, priority, deadline } = req.body;

  if (!title || !taskDescription || !assignedTo || !priority || !deadline) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const taskRef = db.collection("tasks").doc();
    const taskData = {
      id: taskRef.id,
      title,
      taskDescription,
      assignedTo,
      priority,
      deadline,
      createdAt: new Date().toISOString()
    };

   
    await taskRef.set(taskData);

 
    await db.collection('employees').doc(assignedTo).update({
      "userData.assignedTasks": admin.firestore.FieldValue.arrayUnion(taskData)
    });

    return res.status(200).json({
      message: "Task assigned successfully"
    });

  } catch (error: any) {
    return res.status(500).json({
      error: error.message
    });
  }
};


export const updatetask = async(req:Request,res:Response)=>{
    const {taskId,empId,status} = req.body;
    try {
     const employeeRef = db.collection("employees").doc(empId);
     const employeeDoc = await employeeRef.get();
     
     if(!employeeDoc.exists){
         res.status(403).json({
             message:"Data is not available"
            })
        }

        const employeeData = employeeDoc.data();

        const task = employeeData?.userData?.assignedTasks.find((t: any) => t.id === taskId);
      

     await employeeRef.update({
        "userData.assignedTasks": admin.firestore.FieldValue.arrayRemove(task),
        "userData.completedTasks": admin.firestore.FieldValue.arrayUnion({...task,status:status})
     });

     res.status(200).json({
        message:"Task marked as completed"
     })
    } catch (error:any) {
        res.status(500).json({
            error:error.message
        })
    }
}