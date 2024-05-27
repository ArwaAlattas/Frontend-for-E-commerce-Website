import { CartState, Product } from "@/types"
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"



const data = getLocalStorage("cart", {
  cartItems: []
})


const initialState: CartState = {
  cartItems: getLocalStorage('cart',[])
}


const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.cartItems.find((cartItem) => cartItem.productID === action.payload.productID)
      if (item) {
        item.orderQuantity += 1
      } else {
        state.cartItems.push({ ...action.payload, orderQuantity: 1 })
      }
      setLocalStorage("cart", state.cartItems)
    },

    incrementQuantity: (state,action:PayloadAction<string>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.productID === action.payload
      )
      if (item ) {
        item.orderQuantity += 1
      }
      setLocalStorage("cart", state.cartItems)
    },

    decrementQuantity: (state,action:PayloadAction<string>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.productID === action.payload
      )
      if (item && item.orderQuantity > 1) {
        item.orderQuantity -= 1
      }
      setLocalStorage("cart", state.cartItems)
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.productID !== action.payload)
      setLocalStorage("cart", state.cartItems)
    },

    removeAllFromCart: (state) => {
      state.cartItems = []
      setLocalStorage("cart", state.cartItems)
    }
  }
})

export const { addToCart, removeFromCart, removeAllFromCart,incrementQuantity,decrementQuantity } = cartSlice.actions
export default cartSlice.reducer
