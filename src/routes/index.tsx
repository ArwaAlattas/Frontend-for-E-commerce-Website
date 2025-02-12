import React from "react"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"

import NavBar from "@/components/layout/Navbar"
import Products from "@/pages/ProductsPage"
import Error from "@/pages/ErrorPage"
import Footer from "@/components/layout/Footer"
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
import ProtectedRoute from "./ProtectedRoute"
import AdminRoute from "./AdminRoute"

import AdminProductsManagement from "@/components/AdminProductsManagement"
import AdminUserManagement from "@/components/AdminUserManagement"
import AdminOrdersManagement from "@/components/AdminOrdersManagement"
import { ScrollProvider } from "@/components/ScrollContext"

const Index = () => {
  return (
   <ScrollProvider>
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <>
              <NavBar />
              <main>
                <Outlet />
              </main>
              <Footer />
            </>
          }
        >
          <Route path="/dashboard" element={<ProtectedRoute />}>
            {/* <Route path="user" element={<UserDashboard />} /> */}
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/orders" element={<UserOrders />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            {/* <Route path="admin" element={<AdminDashboard />} /> */}
            <Route path="admin/products" element={<AdminProductsManagement />} />
            <Route path="admin/categories" element={<AdminCategories />} />
            <Route path="admin/users" element={<AdminUserManagement />} />
            <Route path="admin/orders" element={<AdminOrdersManagement />} />
          </Route>

          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
       
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/shippingInfo" element={<ShoppingAndReturnsInfo />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
        </Route>
        <Route path="*" element={<Error />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
    </ScrollProvider>
  )
}

export default Index
