import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Brand from '@/models/Brand'
import Product from '@/models/Product'
import { convertToPlainObject } from '@/lib/utils'

export async function GET() {
  try {
    await connectDB()
    
    // Get distinct brand IDs from products that are active for ecommerce
    const activeProductBrands = await Product.distinct('marcaId', { 
      activoEcommerce: true 
    })
    
    // Only return brands that have active products
    const brands = await Brand.find({
      _id: { $in: activeProductBrands }
    }).sort({ nombre: 1 }).lean()
    
    const plainBrands = convertToPlainObject(brands)

    return NextResponse.json({ brands: plainBrands })
  } catch (error) {
    console.error('Error fetching brands:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}