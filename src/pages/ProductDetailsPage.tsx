import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import PageTitle from "@/components/PageTitle"
import "../styles/productDetails.css"
import { AppDispatch } from "@/redux/store"
import { fetchProductById } from "@/redux/slices/productSlice"
import useProductState from "@/hooks/ProductState"
import { Button } from "@/components/ui/button";


const ProductDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, error, product } = useProductState()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductById(id))
    }
    fetchData()
  }, [])

  return (
    <article className="details">
      <PageTitle title="ProductDetails" />
      <h2 className="text-2xl  mb-5">Product Details</h2>
      {isLoading && <p>Loading ... </p>}
      {error && <p>Error{error}</p>}

      {product && (
        <div className="product-details ">
          <div className="product-details__left">
            <img className="product-details__img" src={product.imgUrl} alt={product.productName} />
          </div>
          <div className="product-details__right gap-2">
            <h2 className="product-details__name text-2xl mb-5">{product.productName}</h2>
            <p className="product-details__description">{product.description} </p>
            <p className="product-details__quantity">Quantity: {product.quantity}</p>
            <p className="product-details__price">
              {product.price.toLocaleString("en-us", { style: "currency", currency: "SAR" })}
            </p>
            <p className="product-details__created">
              Product added at : {new Date(product.createdAt).toLocaleDateString()}
            </p>
            <Button className="mt-3" ><AddShoppingCartIcon />Add to Cart</Button>
          </div>
        </div>
      )}
    </article>
  )
}

export default ProductDetails
