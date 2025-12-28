"use server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

// --- EXISTING CREATE ACTION ---
export async function createProduct(formData) {
  try {
    await dbConnect();
    const file = formData.get("image"); 
    let imageUrl = "";

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "products" }, (error, result) => {
          if (error) reject(error); else resolve(result);
        }).end(buffer);
      });
      imageUrl = uploadResponse.secure_url;
    }

    await Product.create({
      name: formData.get("name"),
      price: parseFloat(formData.get("price")),
      description: formData.get("description"),
      category: formData.get("category"),
      stock: parseInt(formData.get("stock")),
      imageUrl: imageUrl
    });

    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
}

// --- NEW UPDATE ACTION ---
export async function updateProduct(id, formData) {
  try {
    await dbConnect();
    const file = formData.get("image");
    let updateData = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price")),
      description: formData.get("description"),
      category: formData.get("category"),
      stock: parseInt(formData.get("stock")),
    };

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "products" }, (error, result) => {
          if (error) reject(error); else resolve(result);
        }).end(buffer);
      });
      updateData.imageUrl = uploadResponse.secure_url;
    }

    await Product.findByIdAndUpdate(id, updateData);
    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function deleteProduct(id) {
  try {
    await dbConnect();

    // 1. Find product to check for an image
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");

    // 2. If product has a Cloudinary image, delete it from the cloud
    if (product.imageUrl) {
      // Extract the Public ID from the URL (Cloudinary specific logic)
      const publicId = product.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    // 3. Remove from MongoDB
    await Product.findByIdAndDelete(id);

    // 4. Refresh the page data
    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    throw new Error("Failed to delete product");
  }
}

// --- NEW FETCH SINGLE PRODUCT ACTION ---
export async function getProductById(id) {
  await dbConnect();
  const product = await Product.findById(id).lean();
  return JSON.parse(JSON.stringify(product));
}