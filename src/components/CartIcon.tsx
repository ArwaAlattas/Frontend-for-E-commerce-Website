import React from 'react'
import "../styles/App.css"


import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
function CartIcon({value}:{value:number}) {
  return (
    <div className='cart-icon '>
      <ShoppingCartOutlinedIcon  sx={{ fontSize: 30 }} />
      <span className='badge'>{value}</span>
    </div>
  )
}

export default CartIcon
