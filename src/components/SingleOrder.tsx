import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { TableBody, TableCell, TableRow } from "@mui/material"
import { format } from 'date-fns';

import { Order } from "@/types"
import { AppDispatch } from "@/redux/store"
import useUserState from "@/hooks/UserState"
import "../styles/App.css"
import { fetchUsers } from "@/redux/slices/userSlice"
import { fetchProducts } from "@/redux/slices/productSlice"
import useProductState from "@/hooks/ProductState"

function SingleOrder(props: { order: Order }) {
  const { order } = props
  const { products } = useProductState()
  const { users } = useUserState()

  const dispatch: AppDispatch = useDispatch()
  const [pageNumber] = useState(1)
  const [pageSize] = useState(10)
  const [keyword] = useState("")
  const [sortBy] = useState<string>("name")
  const [isAscending] = useState("true")
  const [selectedCategories] = useState<string[]>([])
  const [minPrice] = useState<number | undefined>(undefined)
  const [maxPrice] = useState<number | undefined>(undefined)

 const formattingDate = (dateTimeString:string) =>{
  const date = new Date(dateTimeString);
  return format(date, 'MM/dd/yyyy hh:mm aa');
 }
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers({ pageNumber, pageSize, keyword, sortBy, isAscending }))
    }
    fetchData()
  }, [])

  const nameOfStatus = (statusNumber: number|undefined) => {
    switch (statusNumber) {
      case 0:
        return "Creating"
      case 1:
        return "Pending"
      case 2:
        return "Processing"
      case 3:
        return "Shipped"
      case 4:
        return "Delivered"
    }
  }
  //public enum PaymentMethod { CreditCard = 0, ApplePay = 1, Visa = 2, Cash = 3, PayPal = 4 };
  const nameOfPaymentMethod = (statusNumber: number|undefined) => {
    switch (statusNumber) {
      case 0:
        return "CreditCard"
      case 1:
        return "ApplePay"
      case 2:
        return "Visa"
      case 3:
        return "Cash"
      case 4:
        return "PayPal"
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        fetchProducts({
          pageNumber,
          pageSize,
          keyword,
          sortBy,
          isAscending,
          selectedCategories,
          minPrice,
          maxPrice
        })
      )
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
        {order.userId}
        </TableCell>
        <TableCell align="center">{nameOfStatus(order.status)}</TableCell>
        <TableCell align="center">{nameOfPaymentMethod(order.payment)}</TableCell>
        <TableCell align="center">
          {formattingDate(order.createdAt)}
        </TableCell>
        <TableCell align="center">{order.amount}</TableCell>
        <TableCell align="center">{order.products?.length} items</TableCell>
      </TableRow>
    </TableBody>
  )
}

export default SingleOrder
