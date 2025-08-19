"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const slides = [
    {
      mobileUrl: "/banner-mobile-1.svg",
      desktopUrl: "/banner-desktop-1.svg",
      alt: "Banner promocional 1",
      title: "Descubre Nuestra Colección",
      description: "Explora nuestra selección premium de productos diseñados para tu estilo de vida.",
      cta: "Ver ofertas",
      ctaLink: "/ofertas"
    },
    {
      mobileUrl: "/banner-mobile-2.svg",
      desktopUrl: "/banner-desktop-2.svg",
      alt: "Banner promocional 2",
      title: "Ofertas Especiales",
      description: "Aprovecha nuestros descuentos exclusivos en productos seleccionados.",
      cta: "Comprar ahora",
      ctaLink: "/productos"
    },
    {
      mobileUrl: "/banner-mobile-3.svg",
      desktopUrl: "/banner-desktop-3.svg",
      alt: "Banner promocional 3",
      title: "Explora por Categorías",
      description: "Encuentra exactamente lo que buscas en nuestras categorías organizadas.",
      cta: "Ver categorías",
      ctaLink: "/categorias"
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 650)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(slideInterval)
  }, [currentIndex])

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-[1501/2667] min-[650px]:aspect-[4001/1105]">
        <div className="absolute inset-0 flex items-center justify-between p-4 z-10">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-full h-full flex-shrink-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              } absolute`}
              style={{ zIndex: index === currentIndex ? 1 : 0 }}
            >
              <Image
                src={isMobile ? slide.mobileUrl : slide.desktopUrl}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}