import api from "@/api"
import { LoginFormData, UpdateProfileFormData, User, UserState } from "@/types"
import { getLocalStorage, getToken, setLocalStorage } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import clsx from "clsx"

const data = getLocalStorage("loginData", { userData: null, token: null, isLoggedIn: false })

const initialState: UserState = {
  users:[],
  error: null,
  isLoading: false,
  userData: data.userData,
  totalPages: 1,
  token: data.token,
  isLoggedIn: data.isLoggedIn
}

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
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
      const response = keyword.length > 0? await api.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyword}&sortBy=${sortBy}&isAscending=${isAscending}`,{
        headers:{
          Authorization: `Bearer ${getToken()}`
        }
      }):
      await api.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&isAscending=${isAscending}`,{
        headers:{
          Authorization: `Bearer ${getToken()}`
        }
      })
      console.log(response.data)
      return response.data
  }
)

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

export const banUnbanUser = createAsyncThunk(
  "users/banUnbanUser",
  async (userId: string) => {
    const response = await api.put(`/users/banUnban/${userId}`,{}, {
      headers:{
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data //http://localhost:5343/api/users/7d5be7c7-f840-426c-b51f-c85e641bbbb3
  }
)

export const loginUser = createAsyncThunk("users/loginUser", async (userData: LoginFormData) => {
  const response = await api.post(`/login`, userData )

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
    builder.addCase(banUnbanUser.fulfilled, (state, action) => {
      const foundUser = state.users.find((user) => user.userID === action.payload.data.userID)
      if(foundUser){
        foundUser.isBanned = action.payload.data.isBanned
        state.isLoading = false
      }
      
     })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
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
