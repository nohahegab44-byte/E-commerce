import { getAllCategories } from '@/services/Categories'
import Link from 'next/link'
import React from 'react'

export default async function ShopByCategory() {
   const Categories = await   getAllCategories()
    return (
        <div className='w-10/12  p-5  w-full mt-10'>
          <div className='flex my-5'>
            <h2 className='border-l-4 border-l-emerald-500 rounded-2xl font-bold text-2xl py-2 pl-2.5'> Category</h2>
            <Link href="/shop" className='text-emerald-500 font-medium hover:underline ml-auto'>View All</Link>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-6 gap-6 m-10 border-2 rounded-2xl  p-10 border-gray-100 cursor-pointer'>
             {Categories.map(item => <div key={item._id} className=' shadow-xl shadow-gray-200 p-5 rounded-2xl font-serif hover:text-emerald-500 hover:shadow'>
              <img className='w-20 h-20 rounded-full m-auto ' src={item.image} alt={item.name}/>
              <h3 className='text-center text-lg'>{item.name}</h3>
                </div>
             )}
          </div>
        </div>
    )
}
