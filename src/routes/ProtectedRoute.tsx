import Login from '@/pages/LoginPage/Login'
import { RootState } from '@/redux/store'
import { LogIn } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

function ProtectedRoute() {
    const {isLoggedIn} = useSelector((state: RootState) => state .userR)
  return isLoggedIn ? <Outlet/> : <Login/>
}

export default ProtectedRoute
