import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import NavBar from "../layout/Navbar"
import Products from "@/pages/ProductsPage/Products"
import Error from "@/pages/ErrorPage/Error"
import Dashboard from "@/pages/Dashboard"
import Footer from "@/layout/Footer"
import ProductDetails from "@/pages/ProductDetailsPage/ProductDetails"
import "../App.css"
import TermsPage from "@/pages/InfoPages/TermsPage"
import ShoppingAndReturnsInfo from "@/pages/InfoPages/ShoppingAndReturnsInfo"
import AboutUs from "@/pages/InfoPages/AboutUs"
import Register from "@/pages/RegisterPage/Register"
import Login from "@/pages/LoginPage/Login"

const Index = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/shippingInfo" element={<ShoppingAndReturnsInfo />} />
          <Route path="/about" element={<AboutUs />}/> 
          <Route path="/register" element={<Register />}/> 
          <Route path="/login" element={<Login/>}/> 
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
