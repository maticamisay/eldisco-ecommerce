import { notFound } from 'next/navigation'
import { VinilosTextilesPage } from '@/components/categories/VinilosTextilesPage'
import { ComponentesPCPage } from '@/components/categories/ComponentesPCPage'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

const categoryComponents: Record<string, React.ComponentType> = {
  'vinilos-textiles': VinilosTextilesPage,
  'componentes-pc': ComponentesPCPage,
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const CategoryComponent = categoryComponents[slug]

  if (!CategoryComponent) {
    notFound()
  }

  return <CategoryComponent />
}

export function generateStaticParams() {
  return [
    { slug: 'vinilos-textiles' },
    { slug: 'componentes-pc' },
  ]
}