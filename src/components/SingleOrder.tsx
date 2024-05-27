
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { TableBody, TableCell, TableRow } from "@mui/material"

import { Order } from "@/types"
import { AppDispatch } from "@/redux/store"
import useUserState from "@/hooks/UserState"
import "../styles/App.css"
import { fetchUsers } from "@/redux/slices/userSlice"
import { fetchProducts } from "@/redux/slices/productSlice"
import useProductState from "@/hooks/ProductState"


function SingleOrder(props: { order:Order}) {
  const { order} = props
  const { products } = useProductState()
  const { users} = useUserState()
 
  const dispatch: AppDispatch = useDispatch()
  const [pageNumber] = useState(1)
  const [pageSize] = useState(10)
  const [keyword] = useState("")
  const [sortBy] = useState<string>("name")
  const [isAscending] = useState("true")
  const [selectedCategories] = useState<string[]>([])
  const [minPrice] = useState<number | undefined>(undefined)
  const [maxPrice] = useState<number | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers({ pageNumber, pageSize, keyword, sortBy, isAscending }))
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, keyword, sortBy, isAscending, selectedCategories ,minPrice,maxPrice}))
    }
    fetchData()
  }, [pageNumber, keyword, sortBy, isAscending])

  return (
    <TableBody>
      <TableRow
        key={order.orderId}
        sx={{ "&:last-child td ,&:last-child th": { border: 1, borderColor: "#EFEBE7" } }}
      >
        <TableCell sx={{ fontWeight: "medium", fontSize: 16 }} component="th" scope="row">
          {order.orderId}
        </TableCell>
        <TableCell align="center">{order.status}</TableCell>
        <TableCell align="center">{order.payment}</TableCell>
        <TableCell align="center">
          {/* {order.userId && users && users.find(u=> u.userID === order.userId)?.username} */}
          {order.userId}
          </TableCell>
        <TableCell align="center">{order.createdAt}</TableCell>
        <TableCell align="center">{order.products?.length}</TableCell>
      </TableRow>
    </TableBody>
  )
}

export default SingleOrder
