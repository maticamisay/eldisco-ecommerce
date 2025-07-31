'use client'

import Link from 'next/link'
import { ArrowLeft, CheckCircle, Palette, Scissors, Thermometer, Zap } from 'lucide-react'

interface VinylProduct {
  name: string
  description: string
  features: string[]
  specifications: {
    thickness: string
    size: string
    temperature: string
    time: string
    durability: string
  }
  advantages: string[]
  colors?: string[]
}

const vinylProducts: VinylProduct[] = [
  {
    name: "Vinilo Textil 3D Puff",
    description: "Vinilo textil con efecto 3D dimensional que crea relieve en tus diseños. Perfecto para dar un acabado profesional y llamativo a prendas deportivas y promocionales.",
    features: [
      "Efecto 3D dimensional",
      "Acabado mate profesional",
      "Fácil aplicación",
      "Resistente al lavado"
    ],
    specifications: {
      thickness: "150 micrones",
      size: "51cm x 1 metro",
      temperature: "120-140°C",
      time: "7 segundos",
      durability: "Más de 30 lavados"
    },
    advantages: [
      "Crea efectos visuales únicos",
      "Ideal para logos y textos",
      "Compatible con algodón y poliéster",
      "Corte preciso y limpio"
    ],
    colors: ["Blanco", "Negro", "Naranja Neón", "Amarillo Neón", "Azul Neón"]
  },
  {
    name: "Vinilo Autoadhesivo Multisuperficie",
    description: "Vinilo permanente ideal para manualidades y decoración. Su acabado semi-mate y alta adherencia lo hacen perfecto para superficies lisas como vidrio, plástico y metal.",
    features: [
      "Autoadhesivo permanente",
      "Acabado semi-mate",
      "Multisuperficie",
      "Fácil de cortar y aplicar"
    ],
    specifications: {
      thickness: "90 µm",
      size: "61cm x 1 metro",
      temperature: "No requiere calor",
      time: "Aplicación inmediata",
      durability: "Más de 30 lavados"
    },
    advantages: [
      "No requiere calor para aplicación",
      "Ideal para manualidades",
      "Excelente adherencia",
      "Fácil de retirar soporte"
    ]
  },
  {
    name: "Vinilo Textil Holográfico",
    description: "Vinilo textil con acabado holográfico que crea efectos visuales espectaculares. Su brillo metálico y efectos de luz lo convierten en la opción perfecta para diseños llamativos.",
    features: [
      "Efecto holográfico brillante",
      "Acabado metálico",
      "Efectos visuales únicos",
      "Resistente al lavado"
    ],
    specifications: {
      thickness: "100 μm",
      size: "50cm x 1 metro",
      temperature: "140-160°C",
      time: "7 segundos",
      durability: "Hasta 30 lavados"
    },
    advantages: [
      "Efectos visuales impactantes",
      "Ideal para eventos especiales",
      "Múltiples colores disponibles",
      "Acabado profesional"
    ],
    colors: ["Plata Arcoíris", "Dorado", "Plateado", "Rosa"]
  },
  {
    name: "Vinilo Textil 3D Reflectivo",
    description: "Vinilo textil reflectivo de alta visibilidad, ideal para ropa de seguridad y deportiva. Sus microesferas de vidrio proporcionan máxima reflectividad en condiciones de poca luz.",
    features: [
      "Alta visibilidad reflectiva",
      "Microesferas de vidrio",
      "Calidad industrial",
      "Ideal para seguridad"
    ],
    specifications: {
      thickness: "600 micrones",
      size: "50cm x 1 metro",
      temperature: "150°C",
      time: "10 segundos",
      durability: "Mantiene reflectividad +30 lavados"
    },
    advantages: [
      "Máxima visibilidad nocturna",
      "Ideal para ropa de trabajo",
      "Calidad industrial",
      "Aplicación profesional"
    ]
  }
]

export function VinilosTextilesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link 
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Vinilos Textiles</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Descubre nuestra selección premium de vinilos textiles coreanos de la marca Unitrade. 
            Calidad profesional para todos tus proyectos creativos y comerciales.
          </p>
        </div>
      </div>

      {/* Introducción */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Por qué elegir nuestros vinilos textiles?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Calidad Premium</h3>
              <p className="text-gray-600 text-sm">Vinilos coreanos Unitrade de máxima calidad y durabilidad</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Scissors className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fácil Aplicación</h3>
              <p className="text-gray-600 text-sm">Corte preciso y aplicación sencilla para resultados profesionales</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Thermometer className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Resistencia</h3>
              <p className="text-gray-600 text-sm">Soporta múltiples lavados manteniendo su calidad</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Palette className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Variedad</h3>
              <p className="text-gray-600 text-sm">Múltiples efectos y colores para cualquier proyecto</p>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Nuestra Línea de Productos</h2>
          
          {vinylProducts.map((product, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Características */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-blue-600" />
                      Características
                    </h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Especificaciones */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Especificaciones Técnicas</h4>
                    <div className="space-y-2 text-sm text-gray-800">
                      <div><span className="font-medium text-gray-900">Grosor:</span> {product.specifications.thickness}</div>
                      <div><span className="font-medium text-gray-900">Tamaño:</span> {product.specifications.size}</div>
                      <div><span className="font-medium text-gray-900">Temperatura:</span> {product.specifications.temperature}</div>
                      <div><span className="font-medium text-gray-900">Tiempo:</span> {product.specifications.time}</div>
                      <div><span className="font-medium text-gray-900">Durabilidad:</span> {product.specifications.durability}</div>
                    </div>
                  </div>
                  
                  {/* Ventajas */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Ventajas</h4>
                    <ul className="space-y-2">
                      {product.advantages.map((advantage, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Colores disponibles */}
                {product.colors && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Colores Disponibles</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color, i) => (
                        <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white p-8 mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Interesado en nuestros vinilos textiles?</h2>
          <p className="text-xl mb-6 text-white/90">
            Contactanos para más información sobre precios, disponibilidad y asesoramiento técnico
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/5491234567890" 
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              WhatsApp
            </a>
            <a 
              href="mailto:info@eldisco.com" 
              className="bg-white hover:bg-gray-100 text-purple-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}