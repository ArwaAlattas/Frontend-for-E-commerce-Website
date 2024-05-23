import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
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

import PageTitle from "@/components/PageTitle"
import { loginUser } from "@/redux/slices/userSlice"
import { AppDispatch} from "@/redux/store"
import { LoginFormData } from "@/types"
import { toastError, toastSuccess } from "@/utils/toast"


const theme = createTheme({
  palette: {
    primary: {
      main: "#c6824c"
    },
    secondary: {
      main: "#c6824c"
    }
  }
})
export default function Login() {
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
    const isAdmin = response.payload.data.loggedInUser.isAdmin;
      toastSuccess(response.payload.message)
      navigate(isAdmin? "/dashboard/admin":"/dashboard/user")
    } catch (error: any) {
      toastError(error.message || "Login failed")
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="Login" />
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
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/register" variant="body2">
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
