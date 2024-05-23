import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import AddIcon from '@mui/icons-material/Add';

import "../styles/products.css"
import PageTitle from "@/components/PageTitle"
import { AppDispatch } from "@/redux/store"
import { Button } from "@/components/ui/button"
import Adminsidebar from "./AdminSideBar"
import useCategoryState from "@/hooks/CategoryState"
import { fetchCategories } from "@/redux/slices/categorySlice"
import SingleCategory from "./SingleCategory"
import { CreateCategoryFormData } from "@/types"
import CreateCategoryDialog from "./CreatCategoryDialog";


const AdminCategories = () => {
  const { categories, isLoading, error, totalPages, category } = useCategoryState()

  const { register, handleSubmit,
    formState: {errors}
    } = useForm<CreateCategoryFormData>()

  const dispatch: AppDispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(10)
  const [keyword, setKeyword] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [isAscending, setIsAscending] = useState("true")
  const [isFormOpen,setisFormOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize, keyword, sortBy, isAscending }))
    }
    fetchData()
  }, [pageNumber, keyword, sortBy, isAscending])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault
    setKeyword(e.target.value)
  }
 
  return (
    <div className="flex-space-around">
     <Adminsidebar/>
       <div className="main-container">
            <h1 className="text-2xl uppercase mb-1">Admin Categories</h1>
      <PageTitle title="Categories" />

      {isLoading && <p>Loading ... </p>}
      {error && <p className="text-red-500">Error{error}</p>}
       
      <div className="flex justify-between w-full ">
        <div>
          <input
            className="search-bar"
            type="text"
            placeholder="Search Products"
            value={keyword}
            onChange={handleSearchChange}
          />
        </div>
        <div>
         <Button size="icon"onClick={()=>{setisFormOpen(!isFormOpen)}}><AddIcon/></Button>
        </div>
      </div>
      {isFormOpen && <CreateCategoryDialog />}
  
      <hr className="line" />
      <section className="products__container" aria-label="Products">
        {categories &&
          categories.length > 0 &&
          categories?.map((category) => <SingleCategory key={category.categoryID} category={category} totalPage={totalPages} />)}
      </section>
      <div className="pagination-section flex gap-1 mt-8">
        <Button
          onClick={() => setPageNumber((currentPage) => currentPage - 1)}
          disabled={pageNumber === 1}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button key={index} onClick={() => setPageNumber(index + 1)}>
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={() => setPageNumber((currentPage) => currentPage + 1)}
          disabled={pageNumber === totalPages}
        >
          Next
        </Button>
      </div>
      </div>
         </div>
  )
}

export default AdminCategories
