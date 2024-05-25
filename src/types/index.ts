export type Product = {
  productID: string
  imgUrl?: string 
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
  totalPages: number
  product: Product | null
  error: null | string
  isLoading: boolean
}
export type Category = {
  categoryID: string
  name: string
  description: string
  createdAt: string
  products: Product[]
}
export type CategoryState = {
  categories: Category[],
  totalPages: number,
  category: Category | null,
  error: null | string,
  isLoading: boolean
}

export type User = {
  userID:string
  username: string
  imgUrl?: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
  isAdmin?: boolean
  isBanned?:boolean
  birthDate?: string
  createdAt?: string
}
export type UserState = {
  users:User[],
  totalPages: number,
  error: null | string
  isLoading: boolean
  userData: null | User
  token: null | string
  isLoggedIn: boolean
}

export type LoginFormData = {
  email: string
  password: string
}

export type LoginData = {
  isLoggedIn: boolean
  userData: User | null
  token: string
}
export type RegisterFormData = {
  userID:string
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  imgUrl: FileList
  phoneNumber: string
  address: string
}
export type CreateProductFormData = {
  imgUrl?:FileList
  productName: string
  description: string
  quantity: number
  price: number
  categoryId: string
  category: Category
}
export type CreateProductForBackend = {
  imgUrl?:string
  productName: string
  description: string
  quantity: number
  price: number
  categoryId: string
  category: Category
}
export type UpdateProfileFormData = {
  username: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
}
export type UpdateCategoryFormData = {
  name:string
  description:string
  }
  
  export type CreateCategoryFormData = {
    name:string
    description:string  
  }
// export type Cart = {
//   cartID: string
// }
// export type Order = {
//   orderID: string
// }
