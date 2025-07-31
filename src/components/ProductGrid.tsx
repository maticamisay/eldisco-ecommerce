'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from './ProductCard'
import { IProduct } from '@/models/Product'

interface ProductGridProps {
  filters?: {
    search?: string
    category?: string
    brand?: string
    maxPrice?: string
  }
}

export function ProductGrid({ filters }: ProductGridProps) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        
        if (filters?.search) params.append('search', filters.search)
        if (filters?.category) params.append('category', filters.category)
        if (filters?.brand) params.append('brand', filters.brand)
        if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice)
        
        const response = await fetch(`/api/products?${params.toString()}`)
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data.products)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 text-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="mt-8 text-center">
        <p className="text-gray-600">No se encontraron productos.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {products.map((product) => (
        <ProductCard key={product._id?.toString() || Math.random().toString()} product={product} />
      ))}
    </div>
  )
}