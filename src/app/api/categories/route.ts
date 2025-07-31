import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Category from '@/models/Category'
import { convertToPlainObject } from '@/lib/utils'

export async function GET() {
  try {
    await connectDB()
    
    const categories = await Category.find({}).sort({ nombre: 1 }).lean()
    
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