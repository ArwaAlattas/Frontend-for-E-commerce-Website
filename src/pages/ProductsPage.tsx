import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import FilterListIcon from "@mui/icons-material/FilterList"
import { Menu,  Sidebar, SubMenu, sidebarClasses } from "react-pro-sidebar"
import CategoryIcon from "@mui/icons-material/Category"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"

import "../styles/products.css"
import PageTitle from "@/components/PageTitle"
import SingleProduct from "@/components/SingleProduct"
import { AppDispatch } from "@/redux/store"
import { fetchProducts } from "@/redux/slices/productSlice"
import { Button } from "@/components/ui/button"
import useProductState from "@/hooks/ProductState"
import useCategoryState from "@/hooks/CategoryState"
import { fetchCategories } from "@/redux/slices/categorySlice"

const Products = () => {
  const { products, isLoading, error, totalPages} = useProductState()
  const { categories } = useCategoryState()
  const dispatch: AppDispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(10)
  const [keyword, setKeyword] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [isAscending, setIsAscending] = useState("true")
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
  

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        fetchProducts({ pageNumber, pageSize, keyword, sortBy, isAscending, selectedCategories ,minPrice,maxPrice})
      )
    }
    fetchData()
  }, [pageNumber, keyword, sortBy, isAscending, selectedCategories,minPrice,maxPrice])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize: 20, keyword, sortBy, isAscending }))
    }
    fetchData()
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault
    setKeyword(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "NameDEC":
        setSortBy("Name")
        setIsAscending("false")
        break
      case "NameASC":
        setSortBy("Name")
        setIsAscending("true")
        break
      case "PriceASC":
        setSortBy("Price")
        setIsAscending("true")
        break
      case "PriceDEC":
        setSortBy("Price")
        setIsAscending("false")
        break
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    )
  }

  const handLeMinPriceChange =(e: React.ChangeEvent<HTMLInputElement>) => {
setMinPrice(Number(e.target.value))
  }

 const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setMaxPrice(Number(e.target.value))
  if(Number(e.target.value) === 0){
    setMaxPrice(undefined)
  }
  }
  return (
  <div>
      <div className="flex w-full bg-[#efebe7] h-400 justify-center">   
        <div className="mx-auto max-w-1xl py-32 sm:py-38 lg:py-10 ">
          
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#272e26] sm:text-6xl">
            Community <span><img  className="inline align-middle" src="https://res.cloudinary.com/arwa-cloud/image/upload/v1716556282/e-commerce/a09fd9dxihehfgcopjaj.png"  width={50} height={50} alt="logo"/></span>f  Coffee Experts 
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#272e26]">
            Sometimes we find ourselves in a tricky situation: urgently need coffee but have no brewing tools in hand.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#c6824c] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#272e26] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div></div>
    <div className="flex-space-around">
      <PageTitle title="Home" />
      <aside className="sidebar-container">
        <Sidebar
          collapsed={!isExpanded}
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              // backgroundColor: 'red',
              borderRadius: "10px"
            }
          }}
         style={{ height: "100%" }}
        >
          <Menu
            className="menu "
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                if (level === 0)
                  return {
                    color: disabled ? "#f5d9ff" : "#c6824c",
                    backgroundColor: active ? "#eecef9" : "undefined",
                    "&:hover": {
                      color: "black"
                    }
                  }
              }
            }}
            style={{ borderRadius: "10px"}}
          >
            <SubMenu icon={<CategoryIcon />} label={!isExpanded ? null : "Filter by Categories"}>
              {categories &&
                categories.length > 0 &&
                categories.map((category) => (
                  <div key={category.categoryID}>
                    <label htmlFor="categories">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.categoryID)}
                        value={category.categoryID}
                        onChange={() => handleCategoryChange(category.categoryID)}
                      />{" "}
                      {"    "}
                      {category.name}
                    </label>
                  </div>
                ))}
            </SubMenu>
            <SubMenu icon={<AttachMoneyIcon />} label={!isExpanded ? null : "Filter by Price"}>
          <div className="flex p-4 gap-2">
          <div  className="flex border rounded-lg p-1 ">
            <label htmlFor="min-price">
                <input
                size={8}
                className="focus:outline-none"
                  type="text"
                  name="min-price"
                  id="min-price"
                  onChange={handLeMinPriceChange}
                />
              </label>
              $
            </div>
            <p>to</p>
            <div className="flex border rounded-lg p-1">
            <label htmlFor="max-price">
                <input
                 className="focus:outline-none"
                size={8}
                  type="text"
                  name="max-price"
                  id="max-price"
                  onChange={handleMaxPriceChange}
                />
              </label>
              $
            </div>
          </div>
            </SubMenu>
            {/* <MenuItem component={<Link to="/dashboard/user/orders" />}>Filter by price</MenuItem> */}
          </Menu>
        </Sidebar>
      </aside>
      <div className={!isExpanded ? "flex  flex-col items-center p-4 justify-items-start h-screen content-start h-auto justify-start w-full": "main-container"}>
        <h1 className="text-2xl uppercase mb-1">Products</h1>
        {isLoading && <p>Loading ... </p>}
        {error && <p className="text-red-500">Error{error}</p>}
        <div className="action">
          <div className="flex items-center justify-center gap-2 ">
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              Filters <FilterListIcon fontSize="small" />
            </Button>
            <input
              className="search-bar h-10"
              type="text"
              placeholder="Search Products"
              value={keyword}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <select
              className="rounded-lg p-2 bg-[#efebe7]  hover:bg-accent hover:text-accent-foreground"
              name="Sort"
              defaultValue={"DEFAULT"}
              onChange={handleSortChange}
            >
              <option value="DEFAULT" disabled hidden>
                Sort
              </option>
              <optgroup label="By Name">
                <option value="NameASC">A to Z</option>
                <option value="NameDEC">Z to A </option>
              </optgroup>
              <optgroup label="By Price">
                <option value="PriceDEC">High to Low</option>
                <option value="PriceASC">Low to High</option>
              </optgroup>
            </select>
          </div>
        </div>
        <hr className="line" />
        <section className="products__container" aria-label="Products">
          {products &&
            products.length > 0 &&
            products?.map((product) => <SingleProduct key={product.productID} product={product} />)}
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
  </div>
  )
}

export default Products
