import api from "@/api"
import { LoginFormData, User, UserState } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: UserState = {
  error: null,
  isLoading: false
}



export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (newUser: User) => {
    const response = await api.post(`/signup`,newUser)
    return response.data
  }
)
export const loginUser = createAsyncThunk(
    "users/loginUser",
    async (userData: LoginFormData) => {
      const response = await api.post(`/login`,userData)
      console.log(response)
      return response.data
    }
  )

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},

})

export default userSlice.reducer
