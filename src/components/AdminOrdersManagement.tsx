import AdminSidebar from "@/components/AdminSideBar"
import{ useEffect } from "react"
import PageTitle from "./PageTitle"
import useOrderState from "@/hooks/OrderState"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import SingleOrder from "./SingleOrder"
import { fetchOrders } from "@/redux/slices/orderSlice"

function AdminOrdersManagement() {
   const { isLoading, error,orders} = useOrderState()
  const dispatch: AppDispatch = useDispatch()
  
  useEffect(() => {
    const fetchData = async () => {
     await dispatch(fetchOrders())
    }
    fetchData()
  }, [])

  return (
    <div className="flex-space-around">
      <AdminSidebar />
      <div className="main-container">
        <h1 className="text-2xl uppercase mb-1">All orders</h1>
        <PageTitle title="Orders" />

        {isLoading && <p>Loading ... </p>}
        {error && <p className="text-red-500">Error{error}</p>}

        <hr className="line" />
        <TableContainer component={Paper} >
          <Table  sx={{ mainWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ bgcolor: '#EFEBE7' ,fontSize: 34, fontWeight: 'medium' }} >
              <TableRow>
              <TableCell sx={{fontSize: 18, fontWeight: 'medium' }} align="center" >User Id</TableCell>
                <TableCell sx={{fontSize: 18, fontWeight: 'medium' }} align="center">Status</TableCell>
                <TableCell sx={{fontSize: 18, fontWeight: 'medium' }} align="center">Payment Methods</TableCell>
                <TableCell sx={{fontSize: 18, fontWeight: 'medium' }} align="center">Added date</TableCell>
                <TableCell sx={{fontSize: 18, fontWeight: 'medium' }}align="center"> Total amount</TableCell>
                <TableCell sx={{fontSize: 18, fontWeight: 'medium' }}align="center">Number of Products </TableCell>
              </TableRow>
            </TableHead>
            {orders &&
              orders.length > 0 &&
              orders?.map((order) => (
                <SingleOrder
                  key={order.orderId}
                   order={order}
                />
               
              ))}
          </Table>
        </TableContainer>
    
      </div>
    </div>
  )
}

export default  AdminOrdersManagement
