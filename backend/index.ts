import express from "express";
import employeeRoute from "./routes/auth.routes.ts";
import taskRoute from "./routes/task.route.ts"; 
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/users",employeeRoute);
app.use("/api/tasks",taskRoute);

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})