import { MapPin, Phone, Clock, Mail } from 'lucide-react'

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contacto</h1>
          <p className="text-gray-600">Visítanos en nuestra tienda o contáctanos para más información</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Información del Local</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Dirección</h3>
                  <p className="text-gray-600">
                    Av. Principal 123<br />
                    Ciudad, Provincia<br />
                    Código Postal 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Teléfono</h3>
                  <p className="text-gray-600">+54 11 1234-5678</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">info@eldisco.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Horarios de Atención</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Lunes a Viernes: 8:00 - 18:00</p>
                    <p>Sábados: 8:00 - 13:00</p>
                    <p>Domingos: Cerrado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Sobre Nosotros</h2>
            
            <div className="space-y-4 text-gray-600">
              <p>
                El Disco es tu ferretería de confianza con más de 20 años de experiencia 
                en el rubro. Nos especializamos en productos de ferretería, construcción 
                y hogar de la más alta calidad.
              </p>
              
              <p>
                Contamos con un amplio stock de herramientas, materiales de construcción, 
                artículos para el hogar, pinturas, electricidad y plomería. Nuestro 
                equipo de profesionales está siempre dispuesto a asesorarte para que 
                encuentres exactamente lo que necesitas.
              </p>
              
              <p>
                Trabajamos con las mejores marcas del mercado y ofrecemos precios 
                competitivos. Además, brindamos servicio de delivery en la zona 
                para tu comodidad.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Nuestros Servicios</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Asesoramiento personalizado
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Delivery en la zona
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Productos de calidad garantizada
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Precios competitivos
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">¿Cómo llegar?</h2>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <p className="text-gray-500">Mapa interactivo próximamente</p>
          </div>
        </div>
      </div>
    </div>
  )
}