import { Link } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import "../App.css"


const NavBar = () => {
  return (
   <div className='header'>
    <img className='img__logo'alt='logo' src='src/images/h-logo.png'/> 
    <nav>
    <Link className='nav__link' to="/">Products</Link> 
    <Link className='nav__link' to="/dashboard">Dashboard</Link>
    <Link className='nav__link ' to="/register"><ShoppingCartOutlinedIcon/></Link> 
    <Link className='nav__link ' to="/register"><AccountCircleOutlinedIcon/></Link> 
   </nav>
   </div>
  )
}

export default NavBar;
