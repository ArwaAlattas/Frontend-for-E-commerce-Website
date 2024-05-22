import { RootState } from "@/redux/store"
import {  useSelector } from "react-redux"

export const  useProductState = () => {
    const { products, error, isLoading, totalPages,product } = useSelector(
        (state: RootState) => state.productR)
      return { products, isLoading, error, totalPages, product }
    }

    export default useProductState