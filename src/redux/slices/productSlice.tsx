import api from "@/api"
import { CreateProductForBackend, ProductState } from "@/types"
import { getToken } from "@/utils/localStorage"
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
    isAscending,
    selectedCategories,
    minPrice,
    maxPrice
  }: {
    pageNumber: number
    pageSize: number
    keyword: string
    sortBy: string
    isAscending: string
    selectedCategories:string[]
    minPrice?:number
    maxPrice?:number
  }) => {
    const params =  new URLSearchParams ({
       pageNumber: pageNumber.toString(), 
       pageSize:pageSize.toString(),
       isAscending,
       keyword,
       sortBy
  })
  selectedCategories.forEach((categoryId)=>{
    params.append( "SelectedCategories", categoryId)
    })
    if(minPrice !== undefined){
      params.append( "minPrice", minPrice.toString())
    }
    if(maxPrice !== undefined){
      params.append( "maxPrice", maxPrice.toString())
    }
    const response = await api.get ("/products" , { params })
    return response.data
  }
)
export const createProduct = createAsyncThunk(
  "products/createProduct ",
  async (newProduct: CreateProductForBackend) => {
    const token = getToken()
    const response = await api.post(`/products`, newProduct, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
)

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string | undefined) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  }
)

export const updateProducts = createAsyncThunk(
  "products/updateProducts ",
  async ({
    productId,
    updateProduct
  }: {
    productId: string
    updateProduct: CreateProductForBackend
  }) => {
    const response = await api.put(`/products/${productId}`, updateProduct, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string) => {
    await api.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return productId
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
      state.product = action.payload.data
      state.isLoading = false
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
      console.log(action.payload)
      state.products.push(action.payload.data)
      state.isLoading = false
    })

    builder.addCase(updateProducts.fulfilled, (state, action) => {
      const foundProduct = state.products.find(
        (product) => product.productID === action.payload.data.productID
      )
      if (foundProduct) {
        foundProduct.productName = action.payload.data.productName
        foundProduct.imgUrl = action.payload.data.imgUrl
        foundProduct.price = action.payload.data.price
        foundProduct.description = action.payload.data.description
        foundProduct.categoryId = action.payload.data.categoryId
        foundProduct.quantity = action.payload.data.quantity
        foundProduct.category = action.payload.data.category
        state.isLoading = false
      }
    })

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((product) => product.productID !== action.payload)
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
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export default productSlice.reducer
