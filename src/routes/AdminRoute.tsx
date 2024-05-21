import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import Login from '@/pages/LoginPage/Login'

function AdminRoute() {
    const {isLoggedIn,userData} = useSelector((state: RootState) => state .userR)
  return isLoggedIn && userData?.isAdmin ? <Outlet/> : <Login/>
}

export default AdminRoute
