import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import "./products.css"
import PageTitle from "@/components/PageTitle"
import SingleProduct from "@/components/SingleProduct"
import { AppDispatch, RootState } from "@/tookit/store"
import { fetchProducts } from "@/tookit/slices/productSlice"
import { Button } from "@/components/ui/button"

const Products = () => {
  const { products, error, isLoading, totalPages } = useSelector(
    (state: RootState) => state.productR
  )
  const dispatch: AppDispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [keyword, setKeyword] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [isAscending,setIsAscending] = useState("true")

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, keyword, sortBy ,isAscending}))
    }
    fetchData()
  }, [pageNumber, keyword, sortBy,isAscending])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault;
    setKeyword(e.target.value)
  }
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
   switch(e.target.value){
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
    // setIsAscending(e.target.value)

  }
  return (
    <div className="container">
      <PageTitle title="Products" />
      <h1 className="text-2xl uppercase mb-1">Products</h1>
      {isLoading && <p>Loading ... </p>}
      {error && <p className="text-red-500">Error{error}</p>}
      <div className="action ">
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
          <select className="sort-by" name="Sort" defaultValue={'DEFAULT'} onChange={handleSortChange}>
          <option value="DEFAULT" disabled hidden>
              Sort
            </option>
            <optgroup label="By Name">
              <option  value="NameASC" >A to Z</option>
              <option value="NameDEC" >Z to A </option>
            </optgroup>
            <optgroup label="By Price">
              <option  value="PriceDEC" >High to Low</option>
              <option value="PriceASC" >Low to High</option>
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
          <Button key={index} onClick={() => setPageNumber(index + 1)
         }>
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
  )
}

export default Products
