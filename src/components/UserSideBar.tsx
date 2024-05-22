import { RootState } from "@/redux/store"
import { Menu, MenuItem, Sidebar, sidebarClasses } from "react-pro-sidebar"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Box} from "@mui/material"

const Usersidebar = () => {
  const { userData } = useSelector((state: RootState) => state.userR)
  return (
    <aside className="sidebar-container">
      {/* <div>
        <h2>User Profile</h2>
        <p>{userData?.username}</p>
        <p> {userData?.email}</p>
      </div>
      <ul>
        <li>
          <Link to="/dashboard/user/profile">Profile</Link>
        </li>
        <li>
          <Link to="/dashboard/user/orders">Orders</Link>
        </li>
      </ul> */}
      <Sidebar  
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            // backgroundColor: 'red',
            borderRadius: "10px"
          }
        }} >
        <Menu
          className="menu"
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  color: disabled ? "#f5d9ff" : "#c6824c",
                  backgroundColor: active ? "#eecef9" : "undefined",
                  "&:hover": {
                    color: "black"
                  }
                }
            } 
          }}
          style={{borderRadius:"10px"}} 
        >
           <Box   alignItems="center"display="flex" flexDirection="column" gap={1}  my={2}>
            <img src={userData?.imgUrl} alt={userData?.username} className="round-image" />
            <h1>{userData?.username}</h1>
            <p>{userData?.email}</p>
          </Box>
          <MenuItem component={ <Link to="/dashboard/user/profile"/>}>Profile</MenuItem>
          <MenuItem component={<Link to="/dashboard/user/orders" />}>Orders</MenuItem>
        </Menu>
      </Sidebar>
    </aside>
  )
}
export default Usersidebar
