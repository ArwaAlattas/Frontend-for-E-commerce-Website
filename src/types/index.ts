export type Product = {
  productID: string
  imgUrl: string
  productName: string
  slug: string
  description: string
  quantity: number
  price: number
  categoryId: string
  category?: Category
  createdAt: string
}
export type ProductState = { 
  products: Product[] 
  totalPages : number
  product:Product | null
  error: null | string
  isLoading: boolean
}
export type Category = {
  categoryID: string
  name:string
  description:string
  createdAt:string
  products:Product[]
}
export type User = {
  username: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  address:string
  isAdmin?:string
  isBanned?:string
  birthDate?:string
  createdAt?: string
}
export type UserState = { 
  error: null | string
  isLoading: boolean
}

export type LoginFormData = {
  email: string
  password: string
}
// export type Cart = {
//   cartID: string
// }
// export type Order = {
//   orderID: string
// }
