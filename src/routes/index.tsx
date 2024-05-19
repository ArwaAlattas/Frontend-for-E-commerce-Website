import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import NavBar from "../layout/Navbar"
import Products from "@/pages/Products"
import Error from "@/pages/Error"
import Dashboard from "@/pages/Dashboard"
import Footer from "@/layout/Footer"
import ProductDetails from "@/pages/ProductDetails"
import "../App.css"
import TermsPage from "@/pages/TermsPage"
import ShoppingAndReturnsInfo from "@/pages/ShoppingAndReturnsInfo"
import AboutUs from "@/pages/AboutUs"
import Register from "@/pages/Register"
import Login from "@/pages/Login"

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
