import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import NavBar from "../layout/Navbar"
import Products from "@/pages/Products"
import Error from "@/pages/Error"
import Dashboard from "@/pages/Dashboard"
import Footer from "@/layout/Footer"
import ProductDetails from "@/pages/ProductDetails"
import "../App.css"

const Index = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
