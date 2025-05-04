import {  Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import { AuthInitializer } from "./components/AuthInitializer";

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
