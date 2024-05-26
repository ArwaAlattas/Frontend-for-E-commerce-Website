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
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import useUserState from "@/hooks/UserState"


function CartPage() {
  const { cartItems } = useCartState()
  const { isLoggedIn } = useUserState()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

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
  const cartTotal = () => {
    let total = 0
    cartItems && cartItems.map((cartItem) => (total += cartItem.price * cartItem.orderQuantity))
    return formatPrice(total)
  }
  const handleCheckOut = () => {
    if (!isLoggedIn) {
      navigate("/login")
    }
    navigate("/dashboard/user/orders ")
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
    <div className="carts">
      {cartItems && cartItems.length > 0 ? (
        <section className="py-20 relative">
          <div className="w-3/4 max-w-7xl px-4 md:px-5 lg-6 mx-auto ">
            <h2 className="title font-manrope font-bold text-4xl leading-10 mb-4 text-center text-black">
              Shopping Cart
            </h2>
            <div className="flex items-end justify-between w-full mb-2">
              <Button variant="outline" onClick={() => navigate("/")}>
                {" "}
                <KeyboardBackspaceIcon /> Shop More{" "}
              </Button>
              <Button variant="delete" onClick={handleDeleteAllProductFromCart}>
                Remove All <DeleteIcon />{" "}
              </Button>
            </div>
            {cartItems.map((product) => (
              <div
                key={product.productID}
                className="rounded-3xl  bg-white border-2 border-gray-200 p-3 lg:p-6 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
              >
                <div className="col-span-12 lg:col-span-2 img box">
                  <img
                    src={product.imgUrl}
                    alt={product.productName}
                    className="max-lg:w-full lg:w-[180px] "
                  />
                </div>
                <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                  <div className="flex items-center justify-between w-full mb-4">
                    <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                      {product.productName}
                    </h5>
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
                    </button>
                  </div>
                  <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                    {product.description}{" "}
                    <a href="javascript:;" className="text-[#c6824c]">
                      More....
                    </a>
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => {
                              handleDecrementQuantity(product.productID)
                            }}
                            className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                          >
                            <svg
                              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                              width="18"
                              height="19"
                              viewBox="0 0 18 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.5 9.5H13.5"
                                stroke=""
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <span
                            id="number"
                            className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100  text-center"
                          >
                            {product.orderQuantity}
                          </span>
                          <button
                          disabled={product.quantity == product.orderQuantity}
                            onClick={() => {
                              handleIncrementQuantity(product.productID)
                            }}
                            className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                          >
                            <svg
                              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                              width="18"
                              height="19"
                              viewBox="0 0 18 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.75 9.5H14.25M9 14.75V4.25"
                                stroke=""
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <p>
                          In stock : {"    "}
                          {product.quantity}
                        </p>
                      </div>
                    </div>
                    <h6 className="text-[#c6824c] font-manrope font-bold text-2xl leading-9 text-right">
                      {formatPrice(product.price)}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col  md:flex-row items-center md:items-center  justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
              <h5 className="text-gray-900 font-manrope font-semibold text-start text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
                Subtotal
              </h5>

              <div className="flex items-center justify-between gap-5 ">
                <button className="rounded-full py-2.5 px-3 bg-gray-200 text-[#c6824c] font-semibold text-xs text-center whitespace-nowrap transition-all duration-500 hover:bg-gray-300">
                  Promo Code?
                </button>
                <h6 className="font-manrope font-bold text-3xl lead-10 text-[#272e26]">
                  {cartTotal()}
                </h6>
              </div>
            </div>
            <div className="max-lg:max-w-lg max-lg:mx-auto">
              <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">
                Shipping taxes, and discounts calculated at checkout
              </p>
              <button
                className="rounded-full py-4 px-6 bg-[#c6824c] text-white font-semibold text-lg w-full md:text-center text-center transition-all duration-500 hover:bg-[#272e26] "
                onClick={handleCheckOut}
              >
                Checkout
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 relative">
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
        </section>
      )}
    </div>
  )
}

export default CartPage
