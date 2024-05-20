import { loginUser, registerUser } from "@/tookit/slices/userSlice"
import { AppDispatch, RootState } from "@/tookit/store"
import { LoginFormData } from "@/types"
import { toastError, toastSuccess } from "@/utils/toast"

import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// function Login() {
//     const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<LoginFormData>()

//   const dispatch: AppDispatch = useDispatch()

//   const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
//     try {
//         const response = await dispatch(loginUser(data));
//         console. log("Response from Register:" + response);
//         toastSuccess(response.payload.message)
//           navigate("/")
//     } catch (error:any) {
//        toastError(error.message || "Login failed")
//     }
//   }
//   return (
//     <div className="register ">
//       <h2>User Login</h2>
//       <form onSubmit={handleSubmit(onSubmit)} >

//        <div className="form-field mb-2">
//        <label htmlFor="email"> Email: </label>
//         <input
//           type="text"
//           {...register("email", {
//             required: "Email is required",
//             pattern: { value: /^[^@ ]+@[^@ ]+\.[^@. ]{2,}$/, message: "Email is not valid" }
//           })}
//         />
//         {errors.email && <p>{errors.email.message}</ p>}
//        </div>
//        <div className="form-field mb-2">
//        <label htmlFor="password"> Password: </label>
//         <input
//           type="password"
//           {...register("password", {
//             required: "Password is required",
//             minLength: { value: 8, message: "Password must be at least 8 characters" }
//           })}
//         />
//         {errors.password && <p>{errors.password.message}</ p>}
//        </div>
//        <Button className="btn" type="submit">Login</Button>
//       </form>
//     </div>
//   )
// }

// export default Login

import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { brown } from "@mui/material/colors"

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme()
const theme = createTheme({
    palette: {
      primary: {
        main: '#c6824c',
      },
      secondary: {
        main: '#c6824c',
      },
    },
  });
export default function SignIn() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>()

  const dispatch: AppDispatch = useDispatch()

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await dispatch(loginUser(data))
      console.log("Response from Register:" + response)
      toastSuccess(response.payload.message)
      navigate("/")
    } catch (error: any) {
      toastError(error.message || "Login failed")
    }
  }
  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       email: data.get('email'),
  //       password: data.get('password'),
  //     });
  //   };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#272e26" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^@ ]+@[^@ ]+\.[^@. ]{2,}$/, message: "Email is not valid" }
              })}
            error={Boolean(errors.email)}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" }
              })}
              error={Boolean(errors.password)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={errors.password?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth  variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/register" variant="body2" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
