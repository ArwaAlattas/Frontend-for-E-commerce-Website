import api from "@/api"
import { LoginFormData, UpdateProfileFormData, User, UserState } from "@/types"
import { getLocalStorage, getToken, setLocalStorage } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const data = getLocalStorage("loginData", { userData: null, token: null, isLoggedIn: false })

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
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, updateUser }: { userId: string; updateUser: UpdateProfileFormData }) => {
    const token = getToken();
    const response = await api.put(`/users/${userId}`, updateUser,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return response.data //http://localhost:5343/api/users/7d5be7c7-f840-426c-b51f-c85e641bbbb3
  }
)

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
      setLocalStorage("loginData",{
        token: state.token,
        userData: state.userData,
        isLoggedIn: state.isLoggedIn
      })
    }
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userData = action.payload.data.loggedInUser
      state.token = action.payload.data.token
      state.isLoggedIn = true
      state.isLoading = false
      setLocalStorage("loginData",{
        token: state.token,
        userData: state.userData,
        isLoggedIn: state.isLoggedIn
      })
    })

    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (state.userData) {
        state.userData.username = action.payload.data.username
        state.userData.firstName = action.payload.data.firstName
        state.userData.lastName = action.payload.data.lastName
        state.userData.phoneNumber = action.payload.data.phoneNumber
        state.userData.address = action.payload.data.address
        setLocalStorage("loginData",{
          token: state.token,
          userData: state.userData,
          isLoggedIn: state.isLoggedIn
        })
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
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
