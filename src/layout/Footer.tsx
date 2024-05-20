import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer">
    <footer className="footer-top">
      <div className="footer__left">
        <Link to={"/shippingInfo" }>
        Shipping and returns
        </Link>
        <Link to={'/terms' }>
        Terms, Conditions and Privacy
        </Link>
        <Link to="/about">About Us</Link>
      </div>
   
        <img className="img__logo" alt="logo"  src="src/images/logo.png" />
      
      <div className="footer__right">
        <h2> CONTACT US </h2>
        <hr className="footer__line" />
     <div className='contact-icons'>
     <a title="X" href="https://www.X.com">
          <XIcon/>
        </a>
        <a title="facebook" href="https://www.facebook.com">
          <FacebookIcon/>
        </a>
        <a title="whatsapp" href="https://web.whatsapp.com">
          <WhatsAppIcon/>
        </a>
        <a title="youtube" href="https://www.youtube.com">
          <YouTubeIcon/>
        </a>
        <a title="telegram" href="https://telegram.org">
          <TelegramIcon/>
        </a>
     </div>
      </div>
    </footer>
    <span> {'Copyright © '}
      <Link color="gray" to="https://github.com/ArwaAlattas">
        Arwa Alattas
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}</span>
    </div>
  )
}

export default Footer
