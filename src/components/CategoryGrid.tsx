'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  slug: string
  image: string
  description: string
  available: boolean
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Vinilos Textiles',
    slug: 'vinilos-textiles',
    image: '/images/categories/vinilos-textiles.jpg',
    description: 'Vinilos de alta calidad para textiles y superficies',
    available: true
  },
  {
    id: '2',
    name: 'Herramientas',
    slug: 'herramientas',
    image: '/images/categories/herramientas.jpg',
    description: 'Herramientas profesionales para todo tipo de trabajos',
    available: false
  },
  {
    id: '3',
    name: 'Pinturas',
    slug: 'pinturas',
    image: '/images/categories/pinturas.jpg',
    description: 'Pinturas y acabados de primera calidad',
    available: false
  },
  {
    id: '4',
    name: 'Materiales de Construcción',
    slug: 'materiales-construccion',
    image: '/images/categories/construccion.jpg',
    description: 'Todo lo necesario para tus proyectos de construcción',
    available: false
  },
  {
    id: '5',
    name: 'Jardín y Exterior',
    slug: 'jardin-exterior',
    image: '/images/categories/jardin.jpg',
    description: 'Productos para el cuidado de jardines y espacios exteriores',
    available: false
  }
]

export function CategoryGrid() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Nuestras Categorías</h2>
        <p className="text-gray-600">Explora nuestras líneas de productos especializados</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            className={getCategoryCardClass(index)}
          />
        ))}
      </div>
    </div>
  )
}

function getCategoryCardClass(index: number): string {
  switch (index) {
    case 0:
      return "md:col-span-2 lg:col-span-2"
    case 1:
      return "lg:row-span-2"
    case 2:
      return ""
    case 3:
      return "md:col-span-2 lg:col-span-1"
    case 4:
      return ""
    default:
      return ""
  }
}

interface CategoryCardProps {
  category: Category
  className?: string
}

function CategoryCard({ category, className }: CategoryCardProps) {
  const CardContent = (
    <div className={cn(
      "relative group overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
      "min-h-[200px] lg:min-h-[250px]",
      !category.available && "opacity-75 grayscale",
      className
    )}>
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-700/80 opacity-90 group-hover:opacity-75 transition-opacity"
        style={{
          backgroundImage: `url(${category.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
        <h3 className="text-xl lg:text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm lg:text-base opacity-90 mb-3">
          {category.description}
        </p>
        
        {category.available ? (
          <div className="flex items-center text-sm font-medium">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full">
              Disponible
            </span>
          </div>
        ) : (
          <div className="flex items-center text-sm font-medium">
            <span className="bg-gray-500 text-white px-3 py-1 rounded-full">
              Próximamente
            </span>
          </div>
        )}
      </div>
      
      {category.available && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )

  if (category.available) {
    return (
      <Link href={`/categorias/${category.slug}`} className="block">
        {CardContent}
      </Link>
    )
  }

  return CardContent
}