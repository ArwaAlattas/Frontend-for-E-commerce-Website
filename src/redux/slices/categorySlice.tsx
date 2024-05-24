import api from "@/api"
import { CategoryState, CreateCategoryFormData, UpdateCategoryFormData } from "@/types"
import { getToken } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: CategoryState = {
  categories: [],
  totalPages: 1,
  category: null,
  error: null,
  isLoading: false
}
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
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
    // const response = await api.get(`/categories`)
    //   return response.data //http://localhost:5343/api/categories
    const response = keyword.length > 0? await api.get(`/categories?pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyword}&sortBy=${sortBy}&isAscending=${isAscending}`):
    await api.get(`/categories?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&isAscending=${isAscending}`)
    // res.data.data.items.$values   ?pageNumber=1&pageSize=2     sortBy=name&isAscending=true
    return response.data
  }
)
export const createCategory  = createAsyncThunk("categories/createCategory ", async (newCategory: CreateCategoryFormData) => {
  const response = await api.post(`/categories`, newCategory, {
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  })
  return response.data.data
})

export const updateCategory  = createAsyncThunk("categories/updateCategory ", async ({categoryId,updateCategory}:{categoryId:string,updateCategory: UpdateCategoryFormData}) => {
  const response = await api.put(`/categories/${categoryId}`, updateCategory, {
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  })
 return response.data
})

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId:string) => {
    await api.delete(`/categories/${categoryId}`,  {
      headers:{
        Authorization: `Bearer ${getToken()}`
      }
    })
    return categoryId
  }
)

const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
     state.categories = state.categories.filter(category => category.categoryID !== action.payload)
     state.isLoading = false
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload)
       state.isLoading = false
     })
     
     builder.addCase(updateCategory.fulfilled, (state, action) => {
      const foundCategory = state.categories.find((category) => category.categoryID === action.payload.data.categoryID)
      if(foundCategory){
        foundCategory.name = action.payload.data.name
        foundCategory.description = action.payload.data.description 
        state.isLoading = false
      } 
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
        state.error = "An error occured"
        state.isLoading = false
      }
    )
  }

})

export default categorySlice.reducer
