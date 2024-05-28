import { useDispatch } from "react-redux"
import { useState } from "react"
import "../styles/App.css"
import { Category } from "@/types"
import { Button } from "./ui/button"
import { AppDispatch } from "@/redux/store"
import { toastError, toastSuccess } from "@/utils/toast"
import { deleteCategory } from "@/redux/slices/categorySlice"
import EditCategoryDialog from "./EditCategoryDialog"
import { TableBody, TableCell, TableRow } from "@mui/material"

function SingleCategory(props: { category: Category; totalPage: number }) {
  const { category,} = props
  const dispatch: AppDispatch = useDispatch()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleDelete = async (categoryId: string) => {
    try {
      await dispatch(deleteCategory(categoryId))
      // window.location.reload;
      toastSuccess("category is deleted")
    } catch (error: unknown) {
      if (error instanceof Error) {
        toastError(`An error occurred: ${error.message}`);
      } else {
        toastError("An unknown error occurred");
      }
    }
  }

  return (
    <TableBody>
       {isFormOpen && <EditCategoryDialog category={category}  />}
      <TableRow
        key={category.categoryID}
        sx={{ "&:last-child td ,&:last-child th": { border: 1, borderColor: "#EFEBE7" } }}>
        <TableCell sx={{ fontWeight: "medium", fontSize: 16 }} component="th" scope="row">
          {category.name}
        </TableCell>
        <TableCell>{category.description}</TableCell>
        <TableCell>
          <div className="flex items-center justify-center gap-x-2">
            <Button
              size="sm"
              onClick={() => {
                setIsFormOpen(!isFormOpen)
              }}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="delete"
              onClick={() => {
                handleDelete(category.categoryID)
              }}
            >
              Delete
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export default SingleCategory
