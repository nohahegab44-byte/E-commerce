
import { getProductById } from '@/services/ProductsServies'
import Link from 'next/link';
import React from 'react'
import { FaStar } from 'react-icons/fa';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Extract the product ID from the URL parameters

  const product = await getProductById(id);

    return (
        <div className='min-h-screen bg-gray-100 flex justify-center py-10'>

      <div className='w-10/12 grid grid-cols-4 gap-8 bg-white p-6 rounded-2xl shadow-lg'>

        {/* image*/}
        <div className='col-span-1 flex flex-col gap-4'>
          <img
            className="w-full h-auto rounded-lg object-cover shadow-md"
            src={product?.imageCover}
            alt={product?.title}
          />

          {/* (gallery) small images*/}
          <div className='flex gap-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                className='w-16 h-16 object-cover rounded-lg border hover:border-emerald-500 cursor-pointer'
              />
            ))}
          </div>
        </div>

        {/* product detalies*/}
        <div className='col-span-3 flex flex-col gap-4'>
          <div className='flex items-center gap-3'>
            <span className='text-sm text-white bg-emerald-500 rounded-full px-3 py-1'>
              {product?.category?.name}
            </span>
            <span className='text-gray-700 font-medium'>
              {product?.brand?.name}
            </span>
          </div>

          <h1 className='text-3xl font-bold'>{product?.title}</h1>

           {/* Rating */}
          <p className='text-gray-800 flex gap-2'>
            <FaStar className='text-yellow-500'/> {product?.ratingsAverage} ({product?.ratingsQuantity} reviews)
          </p>

          <p className='text-2xl font-semibold text-emerald-600'>
            ${product?.price}
          </p>

          <p className='text-gray-600 whitespace-pre-line'>
            {product?.description}
          </p>

        
          <div className="flex gap-2 flex-wrap mt-4">
            <Link href="/" className="flex-1">
               <button className="w-full bg-emerald-500 text-white px-6 py-3 rounded-2xl hover:bg-emerald-600 transition cursor-pointer text-sm md:text-xl">
                 Back to shop
              </button>
            </Link>
            <Link href="/checkout" className="flex-1">
             <button className="w-full bg-gray-800 text-white px-6 py-3 rounded-2xl hover:bg-gray-900 transition cursor-pointer text-sm md:text-xl">
               Buy Now
              </button>
           </Link>
          </div>
           
        </div>

      </div>
    </div>
  )
    
}


