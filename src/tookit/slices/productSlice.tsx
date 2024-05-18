import api from "@/api"
import { ProductState } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: ProductState = {
  products: [],
  totalPages: 1,
  product: null,
  error: null,
  isLoading: false
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    pageNumber,
    pageSize,
    keyword,
    sortBy,
    isAscending
  }: {
    pageNumber: number
    pageSize: number
    keyword: string
    sortBy:string
    isAscending:string
  }) => {
      const response = keyword.length > 0? await api.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyword}&sortBy=${sortBy}&isAscending=${isAscending}`):
      await api.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&isAscending=${isAscending}`)
      // res.data.data.items.$values   ?pageNumber=1&pageSize=2     sortBy=name&isAscending=true
      return response.data
      // if(keyword.length > 0){
      //   const response = await api.get(`/products/search?pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyword}`)
      //   return response.data
      // }else{
      //  if(sortBy.length > 0){
      //   const res = await api.get(`products/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=price&isAscending=false`);
      //   return res.data
      //  }
      //  const response = await api.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}`) 
      //  return response.data
    //  }
  }
)
// export const searchProduct = createAsyncThunk(
//   "products/search",
//   async ( keyword :string) => {
//     const response = await api.get(`/products/search?keyword=${keyword}`)
//     // res.data.data.items.$values  http://localhost:5343/api/products/search?keyword=k
//     console.log(response.data)
//     return response.data
//   }
// )

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string | undefined) => {
    const response = await api.get(`/products/post/${id}`)
    return response.data
  }
)

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.product =  action.payload.data
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
      (state, action) => {
        state.error = "An error occured"
        state.isLoading = false
      }
    )
  }
})

export default productSlice.reducer
