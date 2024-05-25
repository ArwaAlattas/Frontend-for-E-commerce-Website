import { useDispatch } from "react-redux"
import { useState } from "react"
import "../styles/App.css"
import { Product } from "@/types"
import { Button } from "./ui/button"
import { AppDispatch } from "@/redux/store"
import { toastError, toastSuccess } from "@/utils/toast"
import { TableBody, TableCell, TableRow } from "@mui/material"
import EditProductDialog from "./EditProductDialog"
import { deleteProduct } from "@/redux/slices/productSlice"

function SingleAdminProduct(props: { product: Product; totalPage: number }) {
  const { product, totalPage } = props
  const dispatch: AppDispatch = useDispatch()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleDelete = async (categoryId: string) => {
    try {
      await dispatch(deleteProduct(categoryId))
      // window.location.reload;
      toastSuccess("category is deleted")
    } catch (error: any) {
      toastError("an error ")
    }
  }

  return (
    <TableBody>
      <TableRow
        key={product.productID}
        sx={{ "&:last-child td ,&:last-child th": { border: 1, borderColor: "#EFEBE7" } }}
      >
        {isFormOpen && <EditProductDialog product={product} />}
        <TableCell>
          <img src={product.imgUrl} width="80px" height="80px" alt={product.productName} />
        </TableCell>
        <TableCell sx={{ fontWeight: "medium", fontSize: 16 }} component="th" scope="row">
          {product.productName}
        </TableCell>
        <TableCell>{product.category?.name}</TableCell>
        {/* <td>{product.categories.map((category) => category.name). join(", ")}</td> */}
        <TableCell>{product.description}</TableCell>
        <TableCell>{product.price}</TableCell>
        <TableCell>{product.quantity}</TableCell>
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
                handleDelete(product.productID)
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

export default SingleAdminProduct
