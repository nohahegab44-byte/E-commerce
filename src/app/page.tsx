import MySlider from "./_components/MySlider"
import ProductCard from "./_components/ProductCard"
import { getAllProducts } from "@/services/ProductsServies"
import image1 from "@/images/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png"
import image2 from "@/images/istockphoto-1457433817-612x612.jpg"
import image3 from "@/images/images.png"
import { lazy, Suspense } from "react"
import { SkeletonDemo } from "./SkeletonDemo"
import { getMyToken } from "../../utils/getMyToken"

//lazy loading
const ShopByCategoryAsLazyComponent = lazy(()=>import("./_components/ShopByCategory"))

const images = [image1.src,image2.src ,image3.src]
export default async function Home() {

  const products = await getAllProducts()


    getMyToken();  
  
  return (
    <>
    <MySlider listOfImages={images} slidePerview={1}/>
    
    {/* lazy loading */}
    <Suspense fallback={<div className="w-full mx-auto "><SkeletonDemo/></div>}>
      <ShopByCategoryAsLazyComponent/>
    </Suspense>

      <h2 className="border-l-4 border-l-emerald-600 rounded-2xl font-bold text-2xl py-2 pl-2.5 ml-5 mb-5">Featured <span className="text-emerald-600">Products</span></h2>
      <div className="container w-10/12 mx-auto grid gap-5 md:grid-cols-4 xl:grid-cols-5 mb-10">
        {products?.map((product) => <ProductCard key={product.id} product={product} />        
       )}
      </div>
    </>
  )
}