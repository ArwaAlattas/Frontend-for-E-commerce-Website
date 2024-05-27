import { useDispatch } from "react-redux"
import DeleteIcon from "@mui/icons-material/Delete"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined"

import {
  decrementQuantity,
  incrementQuantity,
  removeAllFromCart,
  removeFromCart
} from "@/redux/slices/cartSlice"
import { AppDispatch } from "@/redux/store"
import useCartState from "@/hooks/CartState"
import { useNavigate } from "react-router-dom"
import useUserState from "@/hooks/UserState"
import { FormControl, FormControlLabel,  Radio, RadioGroup } from "@mui/material"
import { Button } from "../components/ui/button"
import { CartItem} from "@/types"
import { useState } from "react"
import { createOrder } from "@/redux/slices/orderSlice"
import { toastSuccess } from "@/utils/toast"


function CartPage() {
  const { cartItems } = useCartState()
  const { isLoggedIn } = useUserState()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
const [paymentMethod,setPaymentMethod] = useState(0)

  const handleDeleteProductFromCart = (productId?: string) => {
    if (productId) {
      dispatch(removeFromCart(productId))
    }
  }

  const handleDeleteAllProductFromCart = () => {
    dispatch(removeAllFromCart())
  }
  const formatPrice = (amount: number) => {
    return amount.toLocaleString("en-US", { style: "currency", currency: "USD" })
  }
  const cartTotal = (delivery:number) => {
    let total = 0
    cartItems && cartItems.map((cartItem) => (total += cartItem.price * cartItem.orderQuantity ))
    if(cartItems.length > 0){
      total + delivery
    }
    return formatPrice(total)
  }
  const cartItemsTotal = () => {
    let total = 0
    cartItems && cartItems.map((cartItem) => (total += cartItem.orderQuantity ))
    return total
  }
  const cartItemTotal = (cartItem:CartItem) => {
    const total = cartItem.price * cartItem.orderQuantity 
    return formatPrice(total)
  }
  const handleCheckOut = async() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
if(cartItems.length > 0 && paymentMethod){
 const res = await dispatch(createOrder( {
    cartItems:cartItems,
    paymentMethod:paymentMethod
   }))
  toastSuccess(res.payload.message)
}
  
    //  navigate("/dashboard/user/orders ")
  }
  const handleIncrementQuantity = (productId?: string) => {
    if (productId) {
      dispatch(incrementQuantity(productId))
    }
  }

  const handleDecrementQuantity = (productId?: string) => {
    if (productId) {
      dispatch(decrementQuantity(productId))
    }
  }

  return (
    <section className=" relative z-10  after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-[#efebe7]">
     
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
        <div className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
            <div className="flex items-center justify-between pb-5 ">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                Shopping Cart
              </h2>
              <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{cartItems && cartItems.length > 0 ? cartItems.length : 0} Items</h2>
            </div>
            <div className="flex items-end justify-between w-full  pb-6 border-b border-gray-300">
              <Button variant="outline" onClick={() => navigate("/")}>
                {" "}
                <KeyboardBackspaceIcon /> Shop More{" "}
              </Button>
              <Button variant="delete" onClick={handleDeleteAllProductFromCart}>
                Remove All <DeleteIcon />{" "}
              </Button>
            </div>
            <div className="grid grid-cols-12 mt-6 max-md:hidden pb-6 border-b border-gray-200">
              <div className="col-span-12 md:col-span-7">
                <p className="font-normal text-start text-lg leading-8 text-gray-400">Product Details</p>
              </div>
              <div className="col-span-12 md:col-span-5">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                      Quantity
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-end">Total</p>
                  </div>
                </div>
              </div>
            </div>
            {cartItems && cartItems.length > 0 ? (
            cartItems.map((product) => (
           <div  key={product.productID}>
               <span className="flex w-full justify-end h-2 pt-2 items-start "> 
                 <button
                className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
                onClick={() => handleDeleteProductFromCart(product.productID)}
              >
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                    cx="17"
                    cy="17"
                    r="17"
                    fill=""
                  />
                  <path
                    className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                    d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                    stroke="#EF4444"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button></span>
              <div  className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
              <div className="w-full md:max-w-[126px]">
                <img
                 src={product.imgUrl}
                 alt={product.productName}
                  className="mx-auto"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                <div className="md:col-span-2">
                  <div className="flex flex-col max-[500px]:items-center gap-3">
                    <h6 className="font-semibold text-base leading-7 text-black">
                    {product.productName}
                    </h6>
                    <h6 className="font-normal text-base leading-7 text-gray-500">{product.category?.name}</h6>
                    
                    <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-[#c6824c]">
                     {formatPrice(product.price)}
                    </h6>
                    <p>
                          In stock : {"    "}
                          {product.quantity}
                        </p>
                  </div>
                </div>
                <div className="flex  items-center max-[500px]:justify-center h-full max-md:mt-3">
                  <div className="flex items-center h-full">
                    <button
                      onClick={() => {
                        handleDecrementQuantity(product.productID)
                      }}
                    className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                      <svg
                        className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                        <path
                          d="M16.5 11H5.5"
                          stroke=""
                          strokeOpacity="0.2"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M16.5 11H5.5"
                          stroke=""
                          strokeOpacity="0.2"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <span  className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent">{product.orderQuantity}</span>
                    <button
                     disabled={product.quantity == product.orderQuantity}
                     onClick={() => {
                       handleIncrementQuantity(product.productID)
                     }}
                     className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                      <svg
                        className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M11 5.5V16.5M16.5 11H5.5"
                          stroke=""
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M11 5.5V16.5M16.5 11H5.5"
                          stroke=""
                          strokeOpacity="0.2"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M11 5.5V16.5M16.5 11H5.5"
                          stroke=""
                          strokeOpacity="0.2"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                  <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-[#c6824c]">
                   {cartItemTotal(product)}
                  </p>
                </div>
              </div>
            </div>
           </div>
            ))
   ): (
              <div className="py-20 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto ">
                  <h2 className="title font-manrope font-bold text-4xl leading-10 mb-4 text-center text-black">
                    Your bag is empty!
                  </h2>
                  <LocalMallOutlinedIcon sx={{ fontSize: 150, color: "#c6824c" }} />
                </div>
                <Button className="mt-5" variant="outline" onClick={() => navigate("/")}>
                  {" "}
                  <KeyboardBackspaceIcon /> Back to Shop{" "}
                </Button>
              </div>
            )}
          </div>

          <div className=" col-span-12  xl:col-span-4  bg-[#efebe7] w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
              Order Summary
            </h2>
            <div className="mt-8">
              <div className="flex items-center justify-between pb-6">
                <p className="font-normal text-lg leading-8 text-black">{cartItems && cartItems.length > 0 ? cartItemsTotal() : 0} Items</p>
                <p className="font-medium text-lg leading-8 text-black">{cartTotal(45)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <div className="flex items-center justify-between w-full mb-6">
                  <p className="font-normal text-xl leading-8 text-gray-400">Sub Total</p>
                  <h6 className="font-semibold text-xl leading-8 text-gray-900">{cartTotal(0)}</h6>
                </div>
                <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
                  <p className="font-normal text-xl leading-8 text-gray-400">Delivery Charge</p>
                  <h6 className="font-semibold text-xl leading-8 text-gray-900">$45.00</h6>
                </div>
                <div className="flex items-center justify-between w-full py-6">
                  <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                  <h6 className="font-manrope font-medium text-2xl leading-9 text-[#c6824c]">
                  {cartTotal(45)}
                  </h6>
                </div>
              </div>
              <form className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto border border-gray-200">
                <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium">
                Payment
                </label>
                <div className="flex   w-full">
                  <FormControl className="flex   w-full" >
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="0"
                      name="radio-buttons-group"
                      onChange={(e)=>setPaymentMethod(Number(e.target.value))}
                    >
                      <FormControlLabel className="pb-2 w-full pt-1 border-b border-gray-200" value="0" control={<Radio />} label="CreditCard Payment" />
                      <FormControlLabel className="pb-2 w-full pt-1 border-b border-gray-200"value="1" control={<Radio />} label="ApplePay Payment" />
                      <FormControlLabel className="pb-2 w-full pt-1 border-b border-gray-200" value="2" control={<Radio />} label="Visa Payment" />
                      <FormControlLabel className="pb-2 w-full pt-1 border-b border-gray-200" value="3" control={<Radio />} label="Payment Delivery" /> 
                      <FormControlLabel className="pb-2 w-full pt-1" value="4" control={<Radio />} label="PayPal Payment" />
                    </RadioGroup>
                  </FormControl>
                </div>
                </form>
           
                <div className="flex items-center justify-between py-8">
                  <p className="font-medium text-xl leading-8 text-black">{cartItems && cartItems.length > 0 ? cartItemsTotal() : 0} Items</p>
                  <p className="font-semibold text-xl leading-8 text-[#c6824c]">{cartTotal(45)}</p>
                </div>
                <button onClick={()=>handleCheckOut()} className="w-full text-center bg-[#c6824c] rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">
                  Checkout
                </button>
              
            </div>
          </div>
        </div>
      </div>
 
    </section>
  )
}

export default CartPage
