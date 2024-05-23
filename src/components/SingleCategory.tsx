import { useDispatch } from "react-redux";
import { useState } from "react";

import { Category} from "@/types"
import { Button } from "./ui/button";
import { AppDispatch } from "@/redux/store";
import { toastError, toastSuccess } from "@/utils/toast";
import { deleteCategory } from "@/redux/slices/categorySlice";
import EditCategoryDialog from "./EditCategoryDialog";



function SingleCategory(props:{category:Category,totalPage:number}) {
  const { category,totalPage} = props;
  const dispatch: AppDispatch = useDispatch()
  const [isFormOpen,setIsFormOpen] = useState(false);
  const handleDelete = async(categoryId:string)=>{
  try {
    await dispatch(deleteCategory(categoryId))
    
    // window.location.reload;
   
   toastSuccess("category is deleted")

  } catch (error:any) {
    toastError("an ")
  }
  }
  return (
    
    <div className="product card">
        {isFormOpen && <EditCategoryDialog category={category}/>}
      <h2 className="product-title ext-xl uppercase ">{category.name}</h2>
      <p className="product-description">{category.description}</p>
      <div className="flex items-center justify-end gap-x-2">
        <Button  size="sm" onClick={()=>{setIsFormOpen(!isFormOpen)}} >Edit</Button>
        <Button size="sm" variant="delete" onClick={()=>{handleDelete(category.categoryID)}}>Delete</Button>
      </div>
    </div>
  )
}

export default SingleCategory
