"use client"

import { useState, useEffect } from "react"
import { ImageIcon, Loader2 } from "lucide-react"
import fileManagerClient from "@/lib/file-manager-client"

interface SecureImageProps {
  filename: string
  alt: string
  className?: string
  fallbackSrc?: string
  onError?: () => void
  onLoad?: () => void
}

export function SecureImage({ 
  filename, 
  alt, 
  className = "", 
  fallbackSrc,
  onError,
  onLoad 
}: SecureImageProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadSignedUrl = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const url = await fileManagerClient.getImageUrl(filename)
        if (isMounted) {
          setSignedUrl(url)
        }
      } catch (err) {
        console.error('Error loading signed URL:', err)
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error cargando imagen')
          onError?.()
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    if (filename) {
      loadSignedUrl()
    } else {
      setLoading(false)
      setError('Nombre de archivo no proporcionado')
    }

    return () => {
      isMounted = false
    }
  }, [filename, onError])

  const handleImageLoad = () => {
    onLoad?.()
  }

  const handleImageError = () => {
    setError('Error cargando imagen')
    onError?.()
  }

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    )
  }

  if (error || !signedUrl) {
    if (fallbackSrc) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )
    }

    return (
      <div className={`flex flex-col items-center justify-center bg-gray-100 ${className}`}>
        <ImageIcon className="h-6 w-6 text-gray-400 mb-2" />
        <span className="text-xs text-gray-500 text-center px-2">
          Sin imagen
        </span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={signedUrl}
      alt={alt}
      className={className}
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  )
}

export function useSecureImageUrl(filename: string | undefined) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadSignedUrl = async () => {
      if (!filename) {
        setSignedUrl(null)
        setLoading(false)
        setError(null)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        const url = await fileManagerClient.getImageUrl(filename)
        
        if (isMounted) {
          setSignedUrl(url)
        }
      } catch (err) {
        console.error('Error loading signed URL:', err)
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error cargando imagen')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadSignedUrl()

    return () => {
      isMounted = false
    }
  }, [filename])

  return { signedUrl, loading, error }
}