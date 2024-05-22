import { Outlet } from "react-router-dom"

import useUserState from "@/hooks/UserState"
import Login from "@/pages/LoginPage"

function ProtectedRoute() {
  const { isLoggedIn } = useUserState()
  return isLoggedIn ? <Outlet /> : <Login />
}

export default ProtectedRoute
