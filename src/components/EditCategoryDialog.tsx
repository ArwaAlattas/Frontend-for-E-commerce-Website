import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'


import { Category, CreateCategoryFormData, UpdateCategoryFormData } from '@/types'
import { Button } from './ui/button'
import { AppDispatch } from '@/redux/store'
import { toastSuccess } from '@/utils/toast'
import { updateCategory } from '@/redux/slices/categorySlice'


export default function EditCategoryDialog(props:{category:Category}) {
  const {category} = props;
  const [open, setOpen] = useState(true)
  const dispatch: AppDispatch = useDispatch()
  const cancelButtonRef = useRef(null)
  const { register,
    handleSubmit,
    setValue,
    formState: { errors
     }} = useForm<UpdateCategoryFormData>()

     useEffect(() => {
      setValue("name",category.name)
      setValue("description",category.description)
     },[])

     const onSubmit: SubmitHandler<UpdateCategoryFormData> = async (data) => {
        try {
            const response = await dispatch(updateCategory({categoryId:category.categoryID,updateCategory:data}))
             toastSuccess("Category Created successfully")
            console.log(data)
          } catch (error: any) {
            console.log(error)
          }
      setOpen(false)
      }

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
                  <form className="update-form w-full h-full flex items-center" onSubmit={handleSubmit(onSubmit)} >
                <div className="form-field flex items-center justify-center gap-2 ">
                  <label htmlFor="name"> Name: </label>
                  <input
                    type="text"
                  
                    {...register("name", {
                      required: "Name is required",
                      minLength: { value: 2, message: "Name must be at least 2 characters" }
                    })}
                  />
                </div>
                {errors.name && <p>{errors.name.message}</p>}
                <div className="form-field flex items-center justify-center gap-2 ">
                  <label htmlFor="firstName">Description: </label>
                  <input
                 
                    type="text"
                    {...register("description", {
                      required: "description is required",
                      minLength: { value: 2, message: "description must be at least 2 characters" }
                    })}
                  />
                </div>
                {errors.description && <p>{errors.description.message}</p>}
                  <Button className="btn"  type="submit">
                    Edit Category
                  </Button>
              </form>
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
