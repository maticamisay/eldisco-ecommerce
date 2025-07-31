interface FileManagerConfig {
  baseUrl: string
  timeout?: number
}


interface FileInfo {
  id: string
  filename: string
  size: number
  uploadDate: string
  url: string
}

interface FilesResponse {
  files: FileInfo[]
}

interface ErrorResponse {
  error: string
}

interface DownloadUrlResponse {
  message: string
  downloadUrl: string
  filename: string
  expiresIn: number
}

export class FileManagerClient {
  private config: FileManagerConfig

  constructor(config: FileManagerConfig) {
    this.config = {
      timeout: 30000,
      ...config
    }
  }

  async getImageUrl(filename: string): Promise<string> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)
    
    try {
      const response = await fetch(`${this.config.baseUrl}/files/${filename}`, {
        method: 'GET',
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data: DownloadUrlResponse = await response.json()
      return data.downloadUrl
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('La obtención de URL ha tardado demasiado tiempo')
        }
        throw error
      }
      throw new Error('Error desconocido al obtener la URL de imagen')
    }
  }

  async listImages(): Promise<FileInfo[]> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

    try {
      const response = await fetch(`${this.config.baseUrl}/files`, {
        method: 'GET',
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data: FilesResponse = await response.json()
      return data.files
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('La obtención de lista ha tardado demasiado tiempo')
        }
        throw error
      }
      throw new Error('Error desconocido al obtener la lista de imágenes')
    }
  }
}

const fileManagerClient = new FileManagerClient({
  baseUrl: process.env.NEXT_PUBLIC_FILE_MANAGER_API_URL || 'https://file-manager-production-4c33.up.railway.app',
  timeout: parseInt(process.env.NEXT_PUBLIC_FILE_MANAGER_API_TIMEOUT || '30000'),
})

export default fileManagerClient