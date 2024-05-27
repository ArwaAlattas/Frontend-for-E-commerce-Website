import { Link } from 'react-router-dom'


import "@/styles/App.css"
import MenuTransitions from '@/components/SidBarBurgerMenu';
import CartIcon from '@/components/CartIcon';
import useCartState from '@/hooks/CartState';


const NavBar = () => {
  const {cartItems} = useCartState()

  return (
   <div className='header'>
   <div> <img className='img__logo'alt='logo' src='https://res.cloudinary.com/arwa-cloud/image/upload/v1716439647/e-commerce/xnssbamjbhhp2gmsuagc.png'/> </div>
    <nav className='nav-bar'> 
    <Link className='nav__link ' to="/cart"><CartIcon value={cartItems && cartItems.length > 0 ? cartItems.length : 0}/></Link> 
   < MenuTransitions />
   </nav>
   </div>
  )
}

export default NavBar;
