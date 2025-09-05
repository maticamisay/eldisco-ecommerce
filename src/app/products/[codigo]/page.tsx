import { notFound } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import Category from '@/models/Category'
import Brand from '@/models/Brand'
import { convertToPlainObject } from '@/lib/utils'
import { ProductDetailClient } from './ProductDetailClient'

interface ProductPageProps {
  params: { codigo: string }
}

async function getProduct(codigo: string) {
  await connectDB()
  
  const product = await Product.findOne({ codigoInterno: codigo }).lean()
  if (!product) return null
  
  const productData = product as unknown as {
    categoriaId: string
    marcaId: string
  }
  
  const [category, brand] = await Promise.all([
    Category.findById(productData.categoriaId).lean(),
    Brand.findById(productData.marcaId).lean()
  ])
  
  return convertToPlainObject({
    ...product,
    category,
    brand
  }) as {
    _id: string
    nombre: string
    codigoInterno: string
    precio: number
    iva: number
    stock: number
    umbralStockBajo: number
    imagenes?: Array<{
      id: string
      filename: string
      originalName: string
      url: string
      size: number
      uploadDate: string
      isPrimary: boolean
      alt?: string
    }>
    especificaciones?: Array<{
      especificacionId: string
      valor: string | number | boolean
    }>
    category?: {
      _id: string
      nombre: string
    }
    brand?: {
      _id: string
      nombre: string
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.codigo)
  
  if (!product) {
    notFound()
  }
  
  return <ProductDetailClient product={product} />
}