import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import { AuthInitializer } from "./components/AuthInitializer";
import { AppRoutes } from "./configs/router/router.config";
import { AdminPanel } from "./components/adminComp/AdminPanel";
import { AssignTask } from "./components/adminComp/AssignTask";
import { TaskStatus } from "./components/userComp/TaskStatus";
import { PiUserListFill } from "react-icons/pi";
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
        <AuthInitializer />
        {/* use of create browser router */}
        {/* <RouterProvider router={createBrowserRouter(AppRoutes)} />  */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />}>
            <Route path="admin" element={<AdminPanel />} />
            <Route path="assigntask" element={<AssignTask />} />
            <Route path="task-status" element={<TaskStatus />} />
            <Route path="userlist" element={<UserList />} />
          </Route>
        </Routes>
        {/* <RouterProvider router={router}/> */}
        <LoginPage />
      </div>
    </>
  );
}

export default App;
