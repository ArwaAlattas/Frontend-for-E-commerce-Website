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
import { Rating, Typography } from "@mui/material";
import { Product } from "@/types";
import { addToCart } from "@/redux/slices/cartSlice";



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
  const handleAddToCart =(product:Product)=>{
    dispatch(addToCart (product))
  }

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
          <div className="product-details__right gap-4">
            <h2 className="product-details__name text-3xl mb-5">{product.productName}</h2>
            <p className="product-details__description">{product.description} </p>
            <div className="my-2 flex items-center gap-2">
            <Rating value={4} className="text-amber-500" />
            <Typography className="!text-sm font-bold !text-gray-700">
              4.0/5 (100 reviews)
            </Typography>
          </div>
            <p className="product-details__quantity">Quantity: {product.quantity}</p>
            <p className="product-details__price">
              {product.price.toLocaleString("en-us", { style: "currency", currency: "SAR" })}
            </p>
            <p className="product-details__created">
              Product added at : {new Date(product.createdAt).toLocaleDateString()}
            </p>
            <Button className="mt-3"onClick={()=>{handleAddToCart(product)}} ><AddShoppingCartIcon />Add to Cart</Button>
          </div>
        </div>
      )}
    </article>
  )
}

export default ProductDetails
