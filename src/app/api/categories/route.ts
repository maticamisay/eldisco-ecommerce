import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Category from '@/models/Category'
import Product from '@/models/Product'
import { convertToPlainObject } from '@/lib/utils'

export async function GET() {
  try {
    await connectDB()
    
    // Get distinct category IDs from products that are active for ecommerce
    const activeProductCategories = await Product.distinct('categoriaId', { 
      activoEcommerce: true 
    })
    
    // Only return categories that have active products
    const categories = await Category.find({
      _id: { $in: activeProductCategories }
    }).sort({ nombre: 1 }).lean()
    
    const plainCategories = convertToPlainObject(categories)

    return NextResponse.json({ categories: plainCategories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}