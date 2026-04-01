import { ProductType } from "@/types/Product.type"


export async function getAllProducts(): Promise<ProductType[] | null> {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`,{
          cache :"force-cache",
          // next:{
          //   tags:"",
          //   revalidate:60 *5,
          // }
        } 
    )
    const finalRes = await res.json()
    return finalRes.data
    }catch(error){
        console.log(error);
        return null;
    }
  }


  export async function getProductById(id:string): Promise <ProductType | null>{
    try{
      const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${id}`)
      const finalRes = await res.json()
      console.log(finalRes.data)
      return finalRes.data
    }catch(error){
     console.log(error)
     return null;
    }
  }


  export async function getProductsByBrand(brandId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?brand=${brandId}`
    );

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

  