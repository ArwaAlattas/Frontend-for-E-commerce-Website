import { RootState } from "@/redux/store"
import { Menu, MenuItem, Sidebar, SubMenu, sidebarClasses } from "react-pro-sidebar"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CategoryIcon from "@mui/icons-material/Category"
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout"
import GroupIcon from "@mui/icons-material/Group"
import WidgetsIcon from "@mui/icons-material/Widgets"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { Box} from "@mui/material"

const AdminSidebar = () => {
  const { userData } = useSelector((state: RootState) => state.userR)
  return (
    <aside className="sidebar-container ">
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            // backgroundColor: 'red',
            borderRadius: "10px"
          }
        }}
      >
        <Menu
          className="menu"
          menuItemStyles={{
            // button: {

            //   [`&.active`]: {
            //     backgroundColor: "#13395e",
            //     color: "#b6c8d9"
            //   }
            // }
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
          // style={{borderRadius:"10px"}}
        >
          <Box   alignItems="center"display="flex" flexDirection="column" gap={1}  my={2}>
            <img src={userData?.imgUrl} alt={userData?.username} className="round-image" />
            <h1>{userData?.username}</h1>
            <p>{userData?.email}</p>
          </Box>
          <MenuItem icon={<WidgetsIcon />} component={<Link to="/dashboard/admin/products" />}>
            Products
          </MenuItem>
          <MenuItem icon={<GroupIcon />} component={<Link to="/dashboard/admin/users" />}>
            Users
          </MenuItem>
          <MenuItem icon={<CategoryIcon />} component={<Link to="/dashboard/admin/categories" />}>
            Categories
          </MenuItem>
          <MenuItem
            icon={<ShoppingCartCheckoutIcon />}
            component={<Link to="/dashboard/admin/orders" />}
          >
            Orders
          </MenuItem>
        </Menu>
      </Sidebar>
    </aside>
  )
}
export default AdminSidebar
