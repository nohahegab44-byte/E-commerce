import { ProductType } from "./Product.type";

export interface cardResType {
  cartId: string,
  message: string,
  status: string,
  numberOfCartItems?: number,
  numOfCartItems?: number,
  data:{
    totalCartPrice: number,
    products: cartItemType[],
  }
}
  

export interface cartItemType {
    count: number,
    price: number,
    product: ProductType,
}