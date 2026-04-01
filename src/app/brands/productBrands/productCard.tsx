import { BrandType } from '@/types/Product.type'
import Link from 'next/link'

interface BrandCardProps {
  brand: BrandType
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/brands/${brand._id}`}>
      <div className="bg-white p-3 border rounded-xl shadow hover:shadow-lg transition cursor-pointer">
        <img
          src={brand.image}
          alt={brand.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <h3 className="font-semibold text-center mt-3">{brand.name}</h3>
      </div>
    </Link>
  )
}