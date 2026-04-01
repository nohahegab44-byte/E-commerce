export interface ProductType {
  title: string
  imageCover: string
  description: string
  price: number
  id: string
  images: string[]
  ratingsAverage: number
  priceAfterDiscount?: number
  category: CategoryType
  brand: BrandType
  ratingsQuantity: number,
}

export interface CategoryType {
  _id: string
  name: string
  slug: string
  image: string
}

export interface BrandType {
  _id: string
  name: string
  slug: string
  image: string
}