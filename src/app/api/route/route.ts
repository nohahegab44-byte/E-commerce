// /api/route  get post put delete

import { NextRequest, NextResponse } from "next/server";


export async function GET(req :NextRequest){

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products")
    const finalres = await res.json();

    //Date base

    // const user =[
    //     {name :"sham", age: 25},
    //     {name :"mohamed", age: 30},
    //     {name :"ahmed", age: 35},   
    // ]

    return NextResponse.json(finalres )

}