import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./index.css";
import {
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Add from "./pages/Add/Add";
import Orders from "./pages/Orders/Orders";
import List from "./pages/List/List";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const rawUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const url = rawUrl.replace(/\/+$/, "");
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to='/add'/>} />
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element={<List url={url}/>} />
          <Route path="/orders" element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

// const router=createBrowserRouter([
//   {
//     path:'/',
//     element:
//     <div>
//     <div  className="app-content">
//       <Sidebar/>

//     </div>
//       <Add/>

//     </div>
//   },
//   {
//     path:'/add',
//     element:
//     <div>
//     <div  className="app-content">
//       <Sidebar/>

//     </div>
//       <Add/>

//     </div>
//   },
//   {
//     path:'/list',
//     element:
//     <div>
//     <div  className="app-content">
//       <Sidebar/>

//     </div>
//       <List/>

//     </div>
//   },
//   {
//     path:'/orders',
//     element:
//     <div>
//     <div  className="app-content">
//       <Sidebar/>

//     </div>
//       <Orders/>

//     </div>
//   },
// ])


// <div>
//   <Navbar />
//   <hr />
//   <div className="app-content">
//     {/* <Sidebar /> */}
//     <RouterProvider router={router}/>
//   </div>

// </div>
