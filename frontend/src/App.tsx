import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";

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
   
    <div className="font-display">

      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes> 
    {/* <RouterProvider router={router}/> */}
    {/* <LoginPage /> */}
    </div>
      
    </>
  );
}

export default App;
