import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Adminsidebar = () => {
  const { userData } = useSelector((state: RootState) => state.userR)
  return (
    <aside className="sidebar-container">
      <div>
        <h2>Admin Profile</h2>
        <p>{userData?.username}</p>
        <p> {userData?.email}</p>
      </div>
      <ul>
        <li>
        <Link to="/dashboard/admin/products">Products</Link>
        </li>
        <li>
        <Link to="/dashboard/admin/users">Users</Link>
        </li>
        <li>
        <Link to="/dashboard/admin/categories">categories</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/orders">Orders</Link>
        </li>
      </ul>
    </aside>
  )
}
export default Adminsidebar
