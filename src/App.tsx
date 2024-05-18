// import { useQuery } from "@tanstack/react-query"

import Index from "./routes"

// import { Button } from "./components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from "./components/ui/card"
// import { Product } from "./types"
// import api from "./api"

// import "./App.css"
// import { useEffect, useState } from "react"

function App() {
//   const [products, setProducts] = useState<Product[]>();

//   const getProducts = async () => {
//     try {
//       const res = await api.get("/products")
//       setProducts(res.data.data.items.$values)
//       //  return res.data.data.items
//     } catch (error) {
//       console.error(error)
//       return Promise.reject(new Error("Something went wrong"))
//     }
//   }

// useEffect(()=>{
// getProducts()
// },[])
  // Queries
  // const { data, error } = useQuery<Product[]>({
  //   queryKey: ["products"],
  //   queryFn: getProducts
  // })

  return (
    <Index/>
    // <div className="App">
    //   <h1 className="text-2xl uppercase mb-10">Products</h1>

    //   <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
    //     {products?.map((product) => (
    //       <Card key={product.productID} className="w-[350px]">
    //         <CardHeader>
    //           <CardTitle>{product.productName}</CardTitle>
    //           <CardDescription>Some Description here</CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //           <p>Card Content Here</p>
    //         </CardContent>
    //         <CardFooter>
    //           <Button className="w-full">Add to cart</Button>
    //         </CardFooter>
    //       </Card>
    //     ))}
    //   </section>
    //   {/* {error && <p className="text-red-500">{error.message}</p>} */}
    // </div>
  )
}

export default App
