import express from "express";
import { getAllEmployee, removeEmployee, signup } from "../controller/auth.controller.ts";
import { verfiyAdmin } from "../middleware/verifyAdmin.middleware.ts";

const router = express.Router();

router.post("/create",signup);
router.delete("/remove",removeEmployee);
router.get("/all",getAllEmployee);


export default router;