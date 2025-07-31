import { CategoryGrid } from "@/components/CategoryGrid"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">El Disco</h1>
          <p className="text-gray-600 mt-2">Productos de ferretería y hogar</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryGrid />
      </div>
    </div>
  )
}
