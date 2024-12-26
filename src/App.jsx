import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Profile from "./Auth/Profile";
import PrivateRoute from "./Auth/PrivateRoute";
import { AuthProvider } from "./utils/AuthContext";
import ProductMouse from "./Components/Prouduct/ProductMouse";
import ProductDetail from "./Components/Detail/ProductDetail";
import ProductKeyboard from "./Components/Prouduct/ProductKeyboard";
import ProductMic from "./Components/Prouduct/ProductMic";
import ProductMousepad from "./Components/Prouduct/ProductMousepad";
import Cart from "./Components/Cart";
import { CartProvider } from "./utils/CartContext";
import ErrorPage from "./Components/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="Product/Mouse" element={<ProductMouse />} />
      <Route path="Product/Keyboard" element={<ProductKeyboard />} />
      <Route path="Product/Mic" element={<ProductMic />} />
      <Route path="Product/MousePad" element={<ProductMousepad />} />

      <Route path="/product/:productId" element={<ProductDetail/>}/>

      <Route path="Cart" element={<Cart/>}/>
      

      {/* Protected Route for Profile */}
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
       {/* Catch-All Route for Errors */}
       <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
