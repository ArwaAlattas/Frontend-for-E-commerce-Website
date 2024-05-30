import { useDispatch } from "react-redux"
import { Fragment, useEffect, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { CreateProductFormData } from "@/types"
import { AppDispatch } from "@/redux/store"
import { toastError, toastSuccess } from "@/utils/toast"
import { uploadImageToCloudinary } from "@/utils/cloudinary"
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme
} from "@mui/material"
import PageTitle from "./PageTitle"
import useCategoryState from "@/hooks/CategoryState"
import { fetchCategories } from "@/redux/slices/categorySlice"
import { createProduct } from "@/redux/slices/productSlice"

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

export default function CreateProductDialog() {
  const [pageNumber] = useState(1)
  const [pageSize] = useState(10)
  const [keyword] = useState("")
  const [sortBy] = useState<string>("name")
  const [isAscending] = useState("true")
  const [open, setOpen] = useState(true)
  const dispatch: AppDispatch = useDispatch()
  const cancelButtonRef = useRef(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { categories } = useCategoryState()
// const watchedCategoryIds = watch("categoryId")
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CreateProductFormData>()

  
  
  const onSubmit: SubmitHandler<CreateProductFormData> = async (data) => {
    try {
      let imageUrl = " "
      if (data.imgUrl && data.imgUrl.length > 0) {
        const file = data.imgUrl[0]
        imageUrl = await uploadImageToCloudinary(file)
      }

      const productData = {
        ...data,
        imgUrl: imageUrl
      }
console.log(productData)
   await dispatch(createProduct(productData))
      toastSuccess("Product creation Successfully")
    } catch (error: any) {
        toastError("Product creation failed");
    }
    setOpen(false)
  }


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize, keyword, sortBy, isAscending }))
    }
    fetchData()
  }, [pageNumber, keyword, sortBy, isAscending])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#efebe7] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-[#efebe7]  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <ThemeProvider theme={theme}>
                      <PageTitle title="Register" />
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
                          <Typography component="h1" variant="h5">
                            Create Product
                          </Typography>
                          <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{ mt: 3 }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <TextField
                                  {...register("productName", {
                                    required: "Product Name is required",
                                    minLength: {
                                      value: 2,
                                      message: "Name must be at least 2 characters"
                                    }
                                  })}
                                  error={Boolean(errors.productName)}
                                  required
                                  fullWidth
                                  id="productName"
                                  label="Product Name"
                                  name="productName"
                                  autoComplete="productName"
                                  autoFocus
                                  helperText={errors.productName?.message}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  {...register("description", {
                                    required: "Description is required",
                                    minLength: {
                                      value: 10,
                                      message: "description must be at least 10 characters"
                                    }
                                  })}
                                  error={Boolean(errors.description)}
                                  fullWidth
                                  required
                                  name="description"
                                  label="description"
                                  type="text"
                                  id="description"
                                  autoComplete="description"
                                  helperText={errors.description?.message}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  {...register("quantity", {
                                    required: "Quantity is required"
                                  })}
                                  error={Boolean(errors.quantity)}
                                  required
                                  fullWidth
                                  type="number"
                                  id="quantity"
                                  label="quantity"
                                  name="quantity"
                                  autoComplete="given-name"
                                  helperText={errors.quantity?.message}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  {...register("price", {
                                    required: "price is required",
                                    min: { value: 1, message: "price must be greater than 0" }
                                  })}
                                  error={Boolean(errors.price)}
                                  fullWidth
                                  required
                                  id="price"
                                  label="Price"
                                  name="price"
                                  autoComplete="family-name"
                                  helperText={errors.price?.message}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                {/* <TextField
                                  {...register("categoryId", {
                                    required: "categoryId is required"
                                  })}
                                  error={Boolean(errors.categoryId)}
                                  fullWidth
                                  required
                                  name="categoryId"
                                  label="categoryId"
                                  type="text"
                                  id="categoryId"
                                  autoComplete="categoryId"
                                  helperText={errors.categoryId?.message}
                                /> */}
                                <Controller
                                  name="categoryId"
                                  control={control}
                                  render={({ field }) => (
                                    <select
                                      required
                                      defaultValue={"DEFAULT"}
                                      className=" h-12 w-full bg-[#efebe7] p-2 border border-[#B7B5B2]  rounded-lg  focus:outline-[#c6824c]"
                                      {...field}
                                    >
                                      <option value="DEFAULT" disabled hidden>
                                        Choose a Category
                                      </option>
                                      {categories.map((category) => (
                                        <option
                                          key={category.categoryID}
                                          value={category.categoryID}
                                        >
                                          {category.name}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                />
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
                                <Grid item xs={12}>
                                  <img
                                    className="image-preview"
                                    width="80px"
                                    height="80px"
                                    src={imagePreview}
                                    alt="imagePreview"
                                  ></img>
                                </Grid>
                              )}
                            </Grid>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                            >
                              Create Product
                            </Button>
                          </Box>
                        </Box>
                      </Container>
                    </ThemeProvider>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
