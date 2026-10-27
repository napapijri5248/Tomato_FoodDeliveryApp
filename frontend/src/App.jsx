import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import Verify from "./pages/Verify/Verify.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <div>
//         <Navbar setShowLogin={setShowLogin} />
//         <Home />
//       </div>
//     ),
//   },
//   {
//     path: "/cart",
//     element: (
//       <div>
//         <Navbar setShowLogin={setShowLogin} />
//         <Cart />
//       </div>
//     ),
//   },
//   {
//     path: "/order",
//     element: (
//       <div>
//         <Navbar setShowLogin={setShowLogin} />
//         <PlaceOrder />
//       </div>
//     ),
//   },
//   {
//     path: "/verify",
//     element: (
//       <div>
//         <Navbar setShowLogin={setShowLogin} />
//         <Verify />
//       </div>
//     ),
//   },
// ]);
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin}/>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
