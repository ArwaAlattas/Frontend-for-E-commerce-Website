import { Link } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';

import "../styles/App.css"
import { AppDispatch, RootState } from '@/redux/store';
import { logoutUser } from '@/redux/slices/userSlice';
import MenuTransitions from '@/components/SidBarBurgerMenu';


const NavBar = () => {
  const {isLoggedIn} = useSelector((state: RootState) => state .userR)
  const dispatch: AppDispatch = useDispatch()
const handleLogout = () => {
dispatch(logoutUser())
}

  return (
   <div className='header'>
   <div> <img className='img__logo'alt='logo' src='src/images/h-logo.png'/> </div>
    <nav className='nav-bar'> 
    <Link className='nav__link ' to="/cart"><ShoppingCartOutlinedIcon  sx={{ fontSize: 30 }} /></Link> 
   < MenuTransitions />
   </nav>
   </div>
  )
}

export default NavBar;
