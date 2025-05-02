import express from "express";
import { createTaskAndAssign, updatetask } from "../controller/task.controller.ts";

const router = express.Router();

router.post("/assign",createTaskAndAssign);
router.put("/update",updatetask);

export default router;