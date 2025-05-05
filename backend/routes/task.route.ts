import express from "express";
import { createTaskAndAssign, deleteTask, getTasks, updatetask } from "../controller/task.controller.ts";

const router = express.Router();

router.post("/assign",createTaskAndAssign);
router.put("/update",updatetask);
router.get("/all",getTasks);
router.delete("/delete/:id",deleteTask)

export default router;