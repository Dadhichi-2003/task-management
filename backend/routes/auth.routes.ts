import express from "express";
import { getAllEmployee, removeEmployee, signup } from "../controller/auth.controller.ts";
import { verifyAdmin } from "../middleware/verifyAdmin.middleware.ts";


const router = express.Router();

router.post("/create",signup);
router.delete("/remove/:uid",verifyAdmin,removeEmployee);
router.get("/all",verifyAdmin,getAllEmployee);


export default router;