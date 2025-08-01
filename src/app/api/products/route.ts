import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import { convertToPlainObject } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const maxPrice = searchParams.get('maxPrice')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const query: Record<string, unknown> = { activoEcommerce: true }
    
    if (search) {
      query.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { codigoInterno: { $regex: search, $options: 'i' } },
        { codigosBarras: { $in: [new RegExp(search, 'i')] } }
      ]
    }
    
    if (category) {
      query.categoriaId = category
    }
    
    if (brand) {
      query.marcaId = brand
    }
    
    if (maxPrice) {
      query.precio = { $lte: parseFloat(maxPrice) }
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const totalProducts = await Product.countDocuments(query)
    const totalPages = Math.ceil(totalProducts / limit)

    const plainProducts = convertToPlainObject(products)

    return NextResponse.json({
      products: plainProducts,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}