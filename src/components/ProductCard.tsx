'use client'

import Link from 'next/link'
import { IProduct } from '@/models/Product'
import { SecureImage } from './SecureImage'

interface ProductCardProps {
  product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.imagenes?.find(img => img.isPrimary) || product.imagenes?.[0]
  const priceWithIva = product.precio * (1 + product.iva / 100)

  return (
    <Link 
      href={`/products/${product.codigoInterno}`}
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
    >
      <div className="aspect-square relative bg-gray-100 rounded-t-lg overflow-hidden">
        {primaryImage ? (
          <SecureImage
            filename={primaryImage.filename}
            alt={primaryImage.alt || product.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {product.stock <= product.umbralStockBajo && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Poco stock
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
          {product.nombre}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2">
          Código: {product.codigoInterno}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">
              ${priceWithIva.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">
              IVA incluido
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">
              Stock: {product.stock}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}