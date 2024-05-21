import api from "@/api"
import { LoginFormData, User, UserState } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const data =
  localStorage.getItem("loginData") !== null
    ? JSON.parse(String(localStorage.getItem("loginData")))
    : []

const initialState: UserState = {
  error: null,
  isLoading: false,
  userData: data.userData,
  token: data.token,
  isLoggedIn: data.isLoggedIn
}

export const registerUser = createAsyncThunk("users/registerUser", async (newUser: User) => {
  const response = await api.post(`/signup`, newUser)
  return response.data
})
export const loginUser = createAsyncThunk("users/loginUser", async (userData: LoginFormData) => {
  const response = await api.post(`/login`, userData)

  return response.data
})

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.token = null
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          token: state.token,
          userData: state.userData,
          isLoggedIn: state.isLoggedIn
        })
      )
    }
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userData = action.payload.data.loggedInUser
      state.token = action.payload.data.token
      state.isLoggedIn = true
      state.isLoading = false
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          token: state.token,
          userData: state.userData,
          isLoggedIn: state.isLoggedIn
        })
      )
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

export const {logoutUser} = userSlice.actions
export default userSlice.reducer
