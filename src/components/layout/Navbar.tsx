import { Link } from 'react-router-dom';
import { useContext} from 'react';

import "@/styles/App.css";
import MenuTransitions from '@/components/SidBarBurgerMenu';
import CartIcon from '@/components/CartIcon';
import useCartState from '@/hooks/CartState';
import useUserState from '@/hooks/UserState';
import { ScrollContext } from '../ScrollContext';

const NavBar = () => {
  const { isLoggedIn, userData } = useUserState();
  const { scrollToFooter } = useContext(ScrollContext);
  const { cartItems } = useCartState();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: `/dashboard/${isLoggedIn && userData && userData.isAdmin ? 'admin' : 'user'}` },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '#' }, 
  ];

  return (
    <div className='header'>
      <div>
        <img
          className='img__logo'
          alt='logo'
          src='https://res.cloudinary.com/arwa-cloud/image/upload/v1716439647/e-commerce/xnssbamjbhhp2gmsuagc.png'
        />
      </div>
      <header className="inset-x-0 top-0">
        <div className="flex items-center justify-center p-6 lg:px-8" aria-label="Global">
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={item.name === 'Contact' ? (e) => { e.preventDefault(); scrollToFooter(); } : undefined}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </header>
      <nav className='nav-bar'>
        <Link className='nav__link' to="/cart">
          <CartIcon value={cartItems && cartItems.length > 0 ? cartItems.length : 0} />
        </Link>
        <MenuTransitions />
      </nav>
    </div>
  );
};

export default NavBar;
