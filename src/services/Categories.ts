import { CategoryType } from "@/types/Product.type";

export async function getAllCategories():Promise<CategoryType[]>{

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`)
    const finalRes = await res.json()
    return finalRes.data;
}