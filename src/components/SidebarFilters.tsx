'use client'

import { useState, useEffect } from 'react'

interface Category {
  _id: string
  nombre: string
}

interface Brand {
  _id: string
  nombre: string
}

interface SidebarFiltersProps {
  selectedCategory: string
  selectedBrand: string
  maxPrice: string
  onCategoryChange: (category: string) => void
  onBrandChange: (brand: string) => void
  onMaxPriceChange: (price: string) => void
  onClearFilters: () => void
  categoryFilter?: string[]
}

export function SidebarFilters({
  selectedCategory,
  selectedBrand,
  maxPrice,
  onCategoryChange,
  onBrandChange,
  onMaxPriceChange,
  onClearFilters,
  categoryFilter
}: SidebarFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    async function fetchFiltersData() {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/brands')
        ])
        
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          let categoriesData_filter = categoriesData.categories || []

          // Filter categories if categoryFilter is provided
          if (categoryFilter && categoryFilter.length > 0) {
            categoriesData_filter = categoriesData_filter.filter((cat: Category) =>
              categoryFilter.includes(cat._id)
            )
          }

          setCategories(categoriesData_filter)
        }
        
        if (brandsRes.ok) {
          const brandsData = await brandsRes.json()
          setBrands(brandsData.brands || [])
        }
      } catch (error) {
        console.error('Error fetching filters data:', error)
      }
    }

    fetchFiltersData()
  }, [categoryFilter])

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 h-fit lg:sticky lg:top-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        <button 
          onClick={onClearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Limpiar
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Categoría
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value=""
                checked={selectedCategory === ''}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="mr-3 text-blue-600"
              />
              <span className="text-gray-700">Todas las categorías</span>
            </label>
            {categories.map((category) => (
              <label key={category._id} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category._id}
                  checked={selectedCategory === category._id}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="mr-3 text-blue-600"
                />
                <span className="text-gray-700">{category.nombre}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Marca
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="brand"
                value=""
                checked={selectedBrand === ''}
                onChange={(e) => onBrandChange(e.target.value)}
                className="mr-3 text-blue-600"
              />
              <span className="text-gray-700">Todas las marcas</span>
            </label>
            {brands.map((brand) => (
              <label key={brand._id} className="flex items-center">
                <input
                  type="radio"
                  name="brand"
                  value={brand._id}
                  checked={selectedBrand === brand._id}
                  onChange={(e) => onBrandChange(e.target.value)}
                  className="mr-3 text-blue-600"
                />
                <span className="text-gray-700">{brand.nombre}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Precio máximo
          </label>
          <input
            type="number"
            placeholder="Ingrese precio máximo"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-500 bg-white"
          />
        </div>
      </div>
    </div>
  )
}