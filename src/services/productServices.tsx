import api from "@/api"

export const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data.data.items.$values
      //  return res.data.data.items
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }