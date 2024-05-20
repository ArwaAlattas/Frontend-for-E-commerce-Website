import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useState } from "react"

import "./register.css"
import { AppDispatch } from "@/tookit/store"
import { registerUser } from "@/tookit/slices/userSlice"
import { toastError, toastSuccess } from "@/utils/toast"
import { uploadImageToCloudinary } from "@/utils/cloudinary"


type FormData = {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  imgUrl: FileList
  phoneNumber: string
  address: string
}

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

export default function SignUp() {
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const dispatch: AppDispatch = useDispatch()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log(data)
      let imageUrl = " "
      if (data.imgUrl && data.imgUrl.length > 0) {
        const file = data.imgUrl[0]
        console.log(file)
        imageUrl = await uploadImageToCloudinary(file)
        console.log("kkkkkkkkkkkk", imageUrl)
      }

      const userData = {
        ...data,
        imgUrl: imageUrl
      }
      console.log("dddd", userData)
      const response = await dispatch(registerUser(userData))
      console.log("Response from Register:" + response)
      toastSuccess(response.payload.data)

      navigate("/login")
    } catch (error: any) {
      toastError(error.message || "Registration failed")
      console.log(error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#272e26" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("username", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" }
                  })}
                  error={Boolean(errors.username)}
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: { value: 2, message: "First Name must be at least 2 characters" }
                  })}
                  error={Boolean(errors.firstName)}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName", {
                    required: "Last Name is required",
                    minLength: { value: 2, message: "Last Name must be at least 2 characters" }
                  })}
                  error={Boolean(errors.lastName)}
                  fullWidth
                  required
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("phoneNumber", {
                    minLength: { value: 10, message: "Phone Number must be  10 numbers" }
                  })}
                  error={Boolean(errors.phoneNumber)}
                  fullWidth
                  name="phoneNumber"
                  label="phoneNumber"
                  type="tel"
                  id="phoneNumber"
                  placeholder="+9665-666-666"
                  autoComplete="phone-Number"
                  helperText={errors.phoneNumber?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("address")}
                  fullWidth
                  name="address"
                  label="address"
                  type="text"
                  id="address"
          
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                  error={Boolean(errors.password)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={errors.password?.message}
                />
                {/* {errors.password && <p>{errors.password.message}</p>} */}
              </Grid>
              <Grid item xs={12}>
                <input
                  className="image-field"
                  type="file"
                  {...register("imgUrl", {
                    required: "Image is required Please select a file"
                  })}
                  id="Image"
                  required
                  accept="image/*" 
                  onChange={handleImageChange}
                />
                {errors.imgUrl && <p className="error">{errors.imgUrl?.message}</p>} 
              </Grid>
              {imagePreview && (
                <img className="image-preview" src={imagePreview} alt="imagePreview"></img>
              )}
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
