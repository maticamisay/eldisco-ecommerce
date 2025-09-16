'use client'

import { useState, useCallback } from 'react'
import { ProductGrid } from '@/components/ProductGrid'
import { SearchBar } from '@/components/SearchBar'
import { SidebarFilters } from '@/components/SidebarFilters'

const PC_COMPONENT_CATEGORIES = [
  '68769d68bd262c27c7bc3923',
  '6872ed349984c9ab45698420',
  '6882a0b0e8a07dbb94c289d9'
]

export function ComponentesPCPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const filters = {
    search: searchTerm,
    category: selectedCategory,
    brand: selectedBrand,
    maxPrice: maxPrice,
    categories: PC_COMPONENT_CATEGORIES
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Componentes de PC</h1>
          <p className="text-gray-600">Encuentra todos los componentes para tu computadora</p>
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
              categoryFilter={PC_COMPONENT_CATEGORIES}
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