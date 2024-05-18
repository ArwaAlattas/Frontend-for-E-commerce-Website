import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import PageTitle from "@/components/PageTitle"
import "../pages/productDetails.css"
import { AppDispatch, RootState } from "@/tookit/store"
import { fetchProductById } from "@/tookit/slices/productSlice"

const ProductDetails = () => {
  const {id} = useParams<{id:string}>()
  const { product, error, isLoading} = useSelector((state: RootState) => state.productR)
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
        <div className="product-details__right">
        <h2 className="product-details__name text-2xl mb-5" >{product.productName}</h2>
        <p className="product-details__description">
        {product.description} </p>
        <p  className="product-details__quantity">Quantity: {product.quantity}</p>
        <p  className="product-details__price">{product.price.toLocaleString("en-us", {style: "currency",currency: "SAR"})}</p>
        <p  className="product-details__created">Product added at : {new Date(product.createdAt).toLocaleDateString()}</p>
        </div>
       
        </div>
      )}
    </article>
  )
}

export default ProductDetails
