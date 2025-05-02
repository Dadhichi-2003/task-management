import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";
import {ToastContainer} from "react-toastify";
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
    <ToastContainer/>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes> 
    {/* <RouterProvider router={router}/> */}
    {/* <LoginPage /> */}
    </div>
      
    </>
  );
}

export default App;
