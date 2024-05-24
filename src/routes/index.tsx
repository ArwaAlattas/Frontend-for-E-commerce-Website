import React from "react"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"

import NavBar from "../layout/Navbar"
import Products from "@/pages/ProductsPage"
import Error from "@/pages/ErrorPage"
import Footer from "@/layout/Footer"
import ProductDetails from "@/pages/ProductDetailsPage"
import "../styles/App.css"
import TermsPage from "@/pages/TermsPage"
import ShoppingAndReturnsInfo from "@/pages/ShoppingAndReturnsInfoPage"
import AboutUs from "@/pages/AboutUsPage"
import Register from "@/pages/RegisterPage"
import Login from "@/pages/LoginPage"
import UserDashboard from "@/pages/UserDashboardPage"
import AdminDashboard from "@/pages/AdminDashboardPage"
import CartPage from "@/pages/CartPage"
import UserProfile from "@/components/UserProfile"
import UserOrders from "@/components/UserOrders"
import AdminCategories from "@/components/AdminCategories"
import AdminProducts from "@/components/AdminProducts"
import AdminOrders from "@/components/AdminOrders"
import ProtectedRoute from "./ProtectedRoute"
import AdminRoute from "./AdminRoute"
import AdminUserManagement from "@/components/AdminUserManagement"

const Index = () => {

  return (
    <BrowserRouter>
        <Routes>
          <Route  element={
            <>
              <NavBar />
              <main>
              <Outlet />
              </main>
              <Footer/>
            </>
          }>
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/orders" element={<UserOrders />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/categories" element={<AdminCategories />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route path="admin/users" element={<AdminUserManagement />} />
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
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      
     
      
    </BrowserRouter>
  )
}

export default Index
