import { CategoryGrid } from "@/components/CategoryGrid"
import Hero from "@/components/Hero"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryGrid />
      </div>
    </div>
  )
}
