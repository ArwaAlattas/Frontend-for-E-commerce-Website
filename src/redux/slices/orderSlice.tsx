import api from "@/api"
import { CartItem, OrderState } from "@/types"
import { getToken } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: OrderState = {
  orders: [],
  order: null,
  error: null,
  isLoading: false
}

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ cartItems, paymentMethod }: { cartItems: CartItem[]; paymentMethod: number }) => {
    const params = new URLSearchParams({
      paymentMethod:paymentMethod.toString()
    })
    // if (paymentMethod !== undefined) {
    //   params.append("paymentMethod", paymentMethod.toString())
    // }
    cartItems.forEach((product) => {
      params.append("productIds", product.productID.toString())
    })

    console.log(params.toString())

    const response = await api.post("/orders", {params}, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    console.log(response.status)
    return response.data
  }
)
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const response =  await api.get(`/orders`,{
      headers:{
        Authorization: `Bearer ${getToken()}`
      }
    });
    console.log(response.data)
    return response.data
  }
)

const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload.data
      state.isLoading = false
    })
  
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.error = null
        state.isLoading = true
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state) => {
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export default orderSlice.reducer
// const params = new URLSearchParams();
// params.append("paymentMethod", paymentMethod.toString());

// cartItems.forEach((product) => {
//   params.append("productIds", product.productID);
// });
// // console.log(params.toString())
// //  const response = await api.post("/orders" ,{params}, {
// //   headers: {
// //     Authorization: `Bearer ${getToken()}`
// //   }
// // })
// const response = await api.post("/orders", params, {
//   headers: {
//     Authorization: `Bearer ${getToken()}`,
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// });
