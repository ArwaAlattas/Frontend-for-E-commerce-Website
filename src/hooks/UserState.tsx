import { RootState } from "@/redux/store"
import {  useSelector } from "react-redux"

export const  useUserState = () => {
 
    const { isLoggedIn, error, isLoading, userData,token,users,totalPages } = useSelector(
        (state: RootState) => state.userR)
      return { isLoggedIn, error, isLoading, userData,token,users,totalPages }
    }

    export default useUserState