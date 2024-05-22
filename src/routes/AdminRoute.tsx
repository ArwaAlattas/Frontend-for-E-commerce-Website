import { Outlet } from "react-router-dom"

import Login from "@/pages/LoginPage"
import useUserState from "@/hooks/UserState"

function AdminRoute() {
  const { isLoggedIn, userData } = useUserState()
  return isLoggedIn && userData?.isAdmin ? <Outlet /> : <Login />
}

export default AdminRoute
