import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { Button } from "./ui/button"
import { Product } from "@/types"
import { Link } from "react-router-dom"

function SingleProduct(props:{product:Product}) {
  const { product} = props;
  return (
    <Link to={`/products/${product.productID}` }>
    <div className="product card">
      <img className="product__img" src={product.imgUrl} alt={product.productName} />
      <h2 className="product-title ext-xl uppercase ">{product.productName}</h2>
      {/* <p className="product-description">{product.description}</p> */}
      <span className="product-quantity">Quantity : {product.quantity}</span>
      
      <div className="products-container__bottom ">
        <Button className=" rounded-full">
          <AddShoppingCartIcon titleAccess="AddShoppingBag" fontSize="small" />
        </Button>
        <span className="product-price">{product.price.toLocaleString("en-us", {style: "currency",currency: "SAR"})}</span>
      </div>
    </div>
    </Link>
  )
}

export default SingleProduct
