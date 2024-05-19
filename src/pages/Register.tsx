
import { Button } from "@/components/ui/button"
import { registerUser } from "@/tookit/slices/userSlice"
import { AppDispatch, RootState } from "@/tookit/store"
import { toastError, toastSuccess } from "@/utils/toast"



import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


type FormData = {
  username: string
  email: string
  password: string
  firstName:string
  lastName:string
//   image: string
  phoneNumber: string
  address: string
}

function Register() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const dispatch: AppDispatch = useDispatch()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
        const response = await dispatch(registerUser(data));
        console. log("Response from Register:" + response);
        toastSuccess(response.payload.data)
         navigate("/login")
    } catch (error:any) {
       toastError(error.message || "Registration failed") 
    }
  }
  return (
    <div className="register ">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} >
       <div className="form-field mb-2">
       <label htmlFor="name"> User Name: </label>
        <input
          type="text"
          {...register("username", {
            required: "Name is required",
            minLength: { value: 2, message: "Name must be at least 2 characters" }
          })}
        />
        {errors.username && <p>{errors.username.message}</ p>}
       </div>
       <div className="form-field mb-2">
       <label htmlFor="email"> Email: </label>
        <input
          type="text"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^[^@ ]+@[^@ ]+\.[^@. ]{2,}$/, message: "Email is not valid" }
          })}
        />
        {errors.email && <p>{errors.email.message}</ p>}
       </div>
       <div className="form-field mb-2">
       <label htmlFor="password"> Password: </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" }
          })}
        />
        {errors.password && <p>{errors.password.message}</ p>}
       </div>
       <div className="form-field mb-2">
       <label htmlFor="firstName"> First Name: </label>
        <input
          type="text"
          {...register("firstName", {
            required: "First Name is required",
            minLength: { value: 2, message: "First Name must be at least 2 characters" }
          })}
        />
        {errors.firstName && <p>{errors.firstName.message}</ p>}
       </div>
       <div className="form-field mb-2">
       <label htmlFor= "lastName"> Last Name: </label>
        <input
          type="text"
          {...register("lastName", {
            required: "Last Name is required",
            minLength: { value: 2, message: "Last Name must be at least 2 characters" }
          })}
        />
        {errors.lastName && <p>{errors.lastName.message}</ p>}
       </div>
       <div className="form-field mb-2">
       <label htmlFor="phoneNumber"> Phone Number: </label>
        <input
          type="number"
          {...register("phoneNumber", {
            minLength: { value: 10, message: "Phone Number must be  10 numbers" }
          })}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</ p>}
       </div>
       <div className="form-field mb-2">
       <label htmlFor= "address">Address: </label>
       <textarea id="" { ... register ("address" )}></textarea>
       </div>
       <Button className="btn" type="submit">Register</Button>
      </form>
    </div>
  )
}

export default Register
