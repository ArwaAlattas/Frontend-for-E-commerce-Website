import { Link } from 'react-router-dom'

import "../App.css"


const NavBar = () => {
  return (
   <div className='header'>
    <img className='img__logo'alt='logo' src='src/images/h-logo.png'/> 
    <nav>
    <Link className='nav__link' to="/">Products</Link> 
    <Link className='nav__link' to="/dashboard">Dashboard</Link>
   </nav>
   </div>
  )
}

export default NavBar;
