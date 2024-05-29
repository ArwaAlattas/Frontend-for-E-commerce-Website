import Usersidebar from "@/components/UserSideBar"
import { Button } from "@/components/ui/button"
import useUserState from "@/hooks/UserState"
import { updateUser } from "@/redux/slices/userSlice"
import { AppDispatch } from "@/redux/store"
import { UpdateProfileFormData } from "@/types"
import { toastError} from "@/utils/toast"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

function UserProfile() {
  const { userData } = useUserState()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateProfileFormData>()

  const dispatch: AppDispatch = useDispatch()

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    if (!userData?.userID) {
      toastError("user Data is not available")
      return
    }
    try {
      const response = await dispatch(updateUser({ userId: userData?.userID, updateUser: data }))
      console.log("Response from Register:" + response)
      // toastSuccess(response.payload.data)
      console.log(data)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <div className="flex-space-around">
      <Usersidebar />
      <div className="main-container">
        {userData && (
          <>
            <img src={userData.imgUrl} alt={userData.username} className="round-image" />
            <h3>Name: {userData.username}</h3>
            <h3>First Name: {userData.firstName}</h3>
            <h3>Last Name: {userData.lastName}</h3>
            <p>Email: {userData.email}</p>
            <p>Phone Number: {userData.phoneNumber}</p>
            <p>Birth Date: {userData.birthDate}</p>
            <p>Address: {userData.address}</p>
            <div className="flex-row-center">
              <Button onClick={() => setIsFormOpen(!isFormOpen)}>
                {isFormOpen ? "Close Edit Profile " : "EditUser Profile "}
              </Button>
            </div>
            {isFormOpen && (
              <form onSubmit={handleSubmit(onSubmit)} className="update-form">
                <div className="form-field">
                  <label htmlFor="name"> UserName: </label>
                  <input
                    type="text"
                    {...register("username", {
                      required: "Name is required",
                      minLength: { value: 2, message: "Name must be at least 2 characters" }
                    })}
                  />
                  {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div className="form-field">
                  <label htmlFor="firstName">First Name: </label>
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "firstName is required",
                      minLength: { value: 2, message: "firstName must be at least 2 characters" }
                    })}
                  />
                  {errors.firstName && <p>{errors.firstName.message}</p>}
                </div>

                <div className="form-field">
                  <label htmlFor="lastName">Last Name: </label>
                  <input
                    type="text"
                    {...register("lastName", {
                      required: "lastName is required",
                      minLength: { value: 2, message: "last Name must be at least 2 characters" }
                    })}
                  />
                  {errors.lastName && <p>{errors.lastName.message}</p>}
                </div>

                <div className="form-field">
                  <label htmlFor="phoneNumber">Phone Number: </label>
                  <input
                    type="text"
                    {...register("phoneNumber", {
                      minLength: { value: 10, message: "Phone Number must be  10 numbers" },
                      maxLength: { value: 10, message: "Phone Number must be  10 numbers" }
                    })}
                  />
                  {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
                </div>

                <div className="form-field">
                  <label htmlFor="address"> Address: </label>
                  <input id="" {...register("address")}></input>
                </div>
                <Button className="btn" type="submit">
                  Update Profile
                </Button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default UserProfile
