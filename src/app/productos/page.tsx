'use client'

import { useState, useCallback } from 'react'
import { ProductGrid } from '@/components/ProductGrid'
import { SearchBar } from '@/components/SearchBar'
import { SidebarFilters } from '@/components/SidebarFilters'

export default function ProductosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const filters = {
    search: searchTerm,
    category: selectedCategory,
    brand: selectedBrand,
    maxPrice: maxPrice
  }

  const handleClearFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedBrand('')
    setMaxPrice('')
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Productos</h1>
          <p className="text-gray-600">Encuentra todos nuestros productos de ferretería y hogar</p>
        </div>

        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 lg:flex-shrink-0">
            <SidebarFilters
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              maxPrice={maxPrice}
              onCategoryChange={setSelectedCategory}
              onBrandChange={setSelectedBrand}
              onMaxPriceChange={setMaxPrice}
              onClearFilters={handleClearFilters}
            />
          </aside>
          
          <main className="flex-1">
            <ProductGrid filters={filters} />
          </main>
        </div>
      </div>
    </div>
  )
}