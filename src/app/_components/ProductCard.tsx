import { ProductType } from '@/types/Product.type'
import Link from 'next/link'
import { CiHeart } from 'react-icons/ci'
import { FaEye, FaStar } from 'react-icons/fa'
import AddToCardBtn from './AddToCardBtn'

export interface ProductCardPropsType {
  product : ProductType,
}

export default function ProductCard({product}: ProductCardPropsType ) {
   
  
  
  return (
       <>
        <div  className="bg-white p-3 border rounded-xl shadow hover:shadow-lg transition relative">

            <div className="absolute top-2 right-1">
              <div className="bg-white border shadow-2xl  w-5 rounded-full flex item-center justify-center cursor-pointer"><CiHeart/></div>
              <Link href={`/product/${product.id}`} className="bg-white border shadow-2xl  w-5 rounded-full flex item-center justify-center mt-2 cursor-pointer"><FaEye/></Link>
            </div>

            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg"
            />

            <p className="text-gray-500 text-xs mt-3">
              {product.category.name}
            </p>

            <h3 className="font-semibold line-clamp-2">
              {product.title.split(" ",2).join(" ")}
            </h3>

            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  className={index < Math.round(product.ratingsAverage)
                    ? "text-yellow-400"
                    : "text-gray-300"}
                />
              ))}
              <span className="ml-2 text-sm">{product.ratingsAverage}</span>
            </div>

           <div className="flex justify-between">
            {product.priceAfterDiscount ? <div> <span className="text-emerald-500 text-xl font-semibold">{product.priceAfterDiscount} EGP</span><span className="text-gray-400 text-s line-through mx-1">{product.price} EGP</span> </div> : <h4 className="text-lg font-semibold mt-2">
              ${product.price} EGP
            </h4>}

            <AddToCardBtn productId={product.id} />
           </div>


          </div>
       </>
    )
}
