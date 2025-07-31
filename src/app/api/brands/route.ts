import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Brand from '@/models/Brand'
import { convertToPlainObject } from '@/lib/utils'

export async function GET() {
  try {
    await connectDB()
    
    const brands = await Brand.find({}).sort({ nombre: 1 }).lean()
    
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