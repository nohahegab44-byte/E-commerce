import { CategoryType } from "@/types/Product.type";

export async function getAllCategories():Promise<CategoryType[]>{

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
    const finalRes = await res.json()
    return finalRes.data;
}