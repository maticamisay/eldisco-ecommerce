import { notFound } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import Category from '@/models/Category'
import Brand from '@/models/Brand'
import { convertToPlainObject } from '@/lib/utils'
import { SecureImage } from '@/components/SecureImage'

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
  
  const primaryImage = product.imagenes?.find((img) => img.isPrimary) || product.imagenes?.[0]
  const priceWithIva = product.precio * (1 + product.iva / 100)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              {primaryImage ? (
                <SecureImage
                  filename={primaryImage.filename}
                  alt={primaryImage.alt || product.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.nombre}
                </h1>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Código: {product.codigoInterno}</span>
                  {product.brand && (
                    <span>Marca: {product.brand.nombre}</span>
                  )}
                  {product.category && (
                    <span>Categoría: {product.category.nombre}</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-4xl font-bold text-gray-900">
                    ${priceWithIva.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    IVA incluido ({product.iva}%)
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.stock > product.umbralStockBajo 
                      ? 'bg-green-100 text-green-800' 
                      : product.stock > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 
                      ? `${product.stock} disponibles` 
                      : 'Sin stock'
                    }
                  </div>
                </div>
              </div>
              
              {product.especificaciones && product.especificaciones.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Especificaciones
                  </h3>
                  <div className="space-y-2">
                    {product.especificaciones.map((spec, index: number) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{spec.especificacionId}:</span>
                        <span className="font-medium">{spec.valor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-6">
                {product.stock > 0 ? (
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Consultar disponibilidad
                  </button>
                ) : (
                  <button disabled className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-medium cursor-not-allowed">
                    Sin stock disponible
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}