import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import NavBar from "../layout/Navbar"
import Products from "@/pages/ProductsPage"
import Error from "@/pages/ErrorPage"
import Dashboard from "@/pages/UserDashboardPage"
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
import CartPage from "@/components/CartPage"
import UserProfile from "@/components/UserProfile"
import UserOrders from "@/components/UserOrders"
import AdminCategories from "@/components/AdminCategories"
import AdminProducts from "@/components/AdminProducts"
import AdminUsers from "@/components/AdminUsers"
import AdminOrders from "@/components/AdminOrders"
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
