import { RootState } from "@/redux/store"
import {  useSelector } from "react-redux"

export const  useCartState = () => {
 
    const {cartItems} = useSelector(
        (state: RootState) => state.cartR)
      return { cartItems }
    }

    export default useCartState