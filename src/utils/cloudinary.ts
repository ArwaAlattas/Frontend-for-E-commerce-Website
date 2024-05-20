export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "pfktbdbt")
 formData.append("cloud_name","arwa-cloud");
  formData.append("folder", "e-commerce")

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/arwa-cloud/image/upload`, {
      method: "POST",    
      body: formData
    })
    if (!response.ok) {
      throw new Error("Failed to upload image")
    }
    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error("error uploading image to Cloudinary", error)
    throw error
  }
}
