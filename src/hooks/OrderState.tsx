import { RootState } from "@/redux/store"
import {  useSelector } from "react-redux"

export const  useOrderState = () => {
 
    const {  error, isLoading,order,orders } = useSelector(
        (state: RootState) => state.orderR)
      return {  error, isLoading,order,orders }
    }

    export default useOrderState