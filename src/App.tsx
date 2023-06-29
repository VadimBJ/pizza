import React from "react";
import Pizzas from "./features/pizzas/Pizzas";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./features/header/Header";
import { Bounce, ToastContainer } from "react-toastify";
import AboutUs from "./features/aboutus/AboutUs";
import Contacts from "./features/contacts/Contacts";
import Cart from "./features/cart/Cart";

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Routes>
        <Route path="/pizza" element={<Pizzas />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<Pizzas />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
