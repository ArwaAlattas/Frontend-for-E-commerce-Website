import React from "react"

function Footer() {
  return (
    <>
    <footer className="footer">
      <div className="footer__left">
        <a href="#" title="About Us">
          About Us
        </a>
        <a href="milto:contact.html" title="ContactPage">
          Contact Us
        </a>
      </div>
      <div>
        <img className="img__logo" alt="logo" src="src/images/logo.png" />
      </div>
      <div className="footer__right">
        <a title="facebook" href="https://www.facebook.com">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a title="whatsapp" href="https://web.whatsapp.com">
          <i className="fa-brands fa-whatsapp"></i>
        </a>
        <a title="youtube" href="https://www.youtube.com">
          <i className="fa-brands fa-youtube"></i>
        </a>
        <a title="telegram" href="https://telegram.org">
          <i className="fa-brands fa-telegram"></i>
        </a>
      </div>
      
    </footer>
    <span>Copyright 2024 © Arwa Alattas. All rights reserved.</span>
    </>
  )
}

export default Footer
