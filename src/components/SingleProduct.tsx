import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"

import { Button } from "./ui/button"
import { Product } from "@/types"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { addToCart } from "@/redux/slices/cartSlice"

function SingleProduct(props: { product: Product }) {
  const dispatch: AppDispatch = useDispatch()
  const { product } = props
  const handleAddToCart =(product:Product)=>{
    dispatch(addToCart (product))
  }
  return (
   
      <div className="product card">
         <Link to={`/products/${product.productID}`}>
        <img className="product__img" src={product.imgUrl} alt={product.productName} />
        <h2 className="product-title ext-xl uppercase ">{product.productName}</h2>
        {/* <p className="product-description">{product.description}</p> */}
        <span className="product-quantity">Quantity : {product.quantity}</span>
        </Link>
        <div className="products-container__bottom ">
          <Button className=" rounded-full" onClick={()=>{handleAddToCart(product)}}>
            <AddShoppingCartIcon titleAccess="AddShoppingBag" fontSize="small" />
          </Button>
          <span className="product-price">
            {product.price.toLocaleString("en-us", { style: "currency", currency: "SAR" })}
          </span>
        </div>
      </div>
  
  )
}

export default SingleProduct
