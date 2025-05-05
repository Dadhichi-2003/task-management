import {  Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import { AuthInitializer } from "./components/AuthInitializer";
import { TaskList } from "./components/userComp/TaskList";
import { TaskStatus } from "./components/userComp/TaskStatus";
import { AdminPanel } from "./components/adminComp/AdminPanel";
import { AssignTask } from "./components/adminComp/AssignTask";
import { UserList } from "./components/adminComp/UserList";

function App() {
  //  const router = createBrowserRouter([
  //   {
  //     path:'/login',
  //     element:<LoginPage/>
  //   },
  //   {
  //     path:'/signup',
  //     element:<SignupPage/>
  //   }
  //  ])
  return (
    <>
   
    <div className="font-display h-screen">
      <AuthInitializer/>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/todo" element={<TaskList/>}/>
        <Route path="/task-status" element={<TaskStatus/>}/>
        <Route path="/admin" element={<AdminPanel/>}/>
        <Route path="/assign-task" element={<AssignTask/>}/>
        <Route path="/userlist" element={<UserList/>}/>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        
      </Routes> 
    {/* <RouterProvider router={router}/> */}
    {/* <LoginPage /> */}
    </div>
      
    </>
  );
}

export default App;
