import { notFound } from 'next/navigation'
import { VinilosTextilesPage } from '@/components/categories/VinilosTextilesPage'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

const categoryComponents: Record<string, React.ComponentType> = {
  'vinilos-textiles': VinilosTextilesPage,
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const CategoryComponent = categoryComponents[params.slug]
  
  if (!CategoryComponent) {
    notFound()
  }

  return <CategoryComponent />
}

export function generateStaticParams() {
  return [
    { slug: 'vinilos-textiles' },
  ]
}