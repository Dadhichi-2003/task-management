import { Request, Response } from "express";
import { db, admin } from "../firebase/firebase.ts";


export const createTaskAndAssign = async (req: Request, res: Response) => {
  console.log("Received body:", req.body); 

  const { taskTitle, taskDescription, assignedTo, priority, deadline, assignDate } = req.body;

 
  if (!taskTitle || !taskDescription || !assignedTo || !priority || !deadline || !assignDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {


    const employeeDoc = await db.collection('employees').doc(assignedTo).get();
    if(!employeeDoc.exists) {
      return res.status(404).json({
        message:"Employee not found"
      })
    }

    const employeeData = employeeDoc.data();
    const employeeName = employeeData?.userData.username;
    console.log("employeename",employeeName);
    

    const taskRef = db.collection("tasks").doc();
    const taskData = {
      id: taskRef.id,
      taskTitle,
      taskDescription,
      assignedTo,
      assignedName:employeeName,
      priority,
      deadline,
      assignDate,
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

export const updatetask = async (req: Request, res: Response) => {
  const { taskId, empId, status } = req.body;

  try {
    const employeeRef = db.collection("employees").doc(empId);
    const employeeDoc = await employeeRef.get();

    if (!employeeDoc.exists) {
      return res.status(403).json({
        message: "Data is not available"
      });
    }

    const employeeData = employeeDoc.data();


    const task = employeeData?.userData?.assignedTasks.find((t: any) => t.id === taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    await employeeRef.update({
      "userData.assignedTasks": admin.firestore.FieldValue.arrayRemove(task),
      "userData.completedTasks": admin.firestore.FieldValue.arrayUnion({
        ...task,
        status: status
      })
    });

    res.status(200).json({
      message: "Task marked as completed"
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message
    });
  }
};


export const getTasks = async(req:Request,res:Response)=>{
  try {
    const snapShot = await db.collection("tasks").get();
    const tasks = snapShot.docs.map((doc)=>({
      id:doc.id,
      ...doc.data()
    }));

    res.status(200).json({
      message:"Task Fetched Successfully",
      tasks
    })
  } catch (error:any) {
    res.status(500).json({
      error:error.message
    })
  }
}

export const deleteTask =async(req:Request,res:Response)=>{
  try {
    const {id} = req.params;
    await db.collection('tasks').doc(id).delete();
    res.status(200).json({
      message:"Tasks Deleted"
    })
  } catch (error:any) {
    res.status(500).json({
      error:error.message
    })
  }
}