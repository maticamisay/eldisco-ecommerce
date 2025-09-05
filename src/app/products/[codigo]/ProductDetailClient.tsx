'use client'

import { SecureImage } from '@/components/SecureImage'
import { openWhatsAppConsultation } from '@/utils/whatsapp'

interface ProductDetailClientProps {
  product: {
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

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const primaryImage = product.imagenes?.find((img) => img.isPrimary) || product.imagenes?.[0]
  const priceWithIva = product.precio * (1 + product.iva / 100)

  const handleWhatsAppConsultation = () => {
    openWhatsAppConsultation({
      productName: product.nombre,
      productCode: product.codigoInterno
    })
  }
  
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
                <button 
                  onClick={handleWhatsAppConsultation}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.119"/>
                  </svg>
                  Consultar disponibilidad por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}