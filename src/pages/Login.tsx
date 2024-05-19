import { Button } from "@/components/ui/button"
import { loginUser, registerUser } from "@/tookit/slices/userSlice"
import { AppDispatch, RootState } from "@/tookit/store"
import { LoginFormData } from "@/types"
import { toastError, toastSuccess } from "@/utils/toast"



import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"




function Login() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>()

  const dispatch: AppDispatch = useDispatch()

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
        const response = await dispatch(loginUser(data));
        console. log("Response from Register:" + response);
        toastSuccess(response.payload.message)
          navigate("/")
    } catch (error:any) {
       toastError(error.message || "Login failed") 
    }
  }
  return (
    <div className="register ">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} >
       
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
            minLength: { value: 8, message: "Password must be at least 8 characters" }
          })}
        />
        {errors.password && <p>{errors.password.message}</ p>}
       </div>
       <Button className="btn" type="submit">Login</Button>
      </form>
    </div>
  )
}

export default Login
