import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import NavBar from "../layout/Navbar"
import Products from "@/pages/ProductsPage/Products"
import Error from "@/pages/ErrorPage/Error"
import Dashboard from "@/pages/user/UserDashboard"
import Footer from "@/layout/Footer"
import ProductDetails from "@/pages/ProductDetailsPage/ProductDetails"
import "../App.css"
import TermsPage from "@/pages/InfoPages/TermsPage"
import ShoppingAndReturnsInfo from "@/pages/InfoPages/ShoppingAndReturnsInfo"
import AboutUs from "@/pages/InfoPages/AboutUs"
import Register from "@/pages/RegisterPage/Register"
import Login from "@/pages/LoginPage/Login"
import UserDashboard from "@/pages/user/UserDashboard"
import AdminDashboard from "@/pages/Admin/AdminDashboard"
import CartPage from "@/pages/CartPage"
import UserProfile from "@/pages/user/UserProfile"
import UserOrders from "@/pages/user/UserOrders"
import AdminCategories from "@/pages/Admin/AdminCategories"
import AdminProducts from "@/pages/Admin/AdminProducts"
import AdminUsers from "@/pages/Admin/AdminUsers"
import AdminOrders from "@/pages/Admin/AdminOrders"
import ProtectedRoute from "./ProtectedRoute"
import AdminRoute from "./AdminRoute"

const Index = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/orders" element={<UserOrders />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/categories" element={<AdminCategories />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          </Route>
        

          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/terms" element={<TermsPage />} />
          <Route path="/shippingInfo" element={<ShoppingAndReturnsInfo />} />
          <Route path="/about" element={<AboutUs />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
