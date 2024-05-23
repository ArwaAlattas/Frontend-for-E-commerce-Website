import { RootState } from "@/redux/store"
import {  useSelector } from "react-redux"

export const  useCategoryState = () => {
    const { categories, error, isLoading, totalPages,category } = useSelector(
        (state: RootState) => state.categoryR)
      return { categories, isLoading, error, totalPages, category}
    }

    export default useCategoryState