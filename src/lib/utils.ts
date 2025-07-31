import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToPlainObject<T>(obj: T): unknown {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
    return obj
  }

  if (obj instanceof Date) {
    return obj.toISOString()
  }

  if (Buffer.isBuffer(obj)) {
    return null
  }

  if (typeof obj === 'object' && obj.constructor === Object.prototype.constructor) {
    if ('_id' in obj && obj._id && typeof obj._id === 'object' && 'toString' in obj._id) {
      (obj as Record<string, unknown>)._id = (obj._id as { toString(): string }).toString()
    }
    if ('id' in obj && obj.id && typeof obj.id === 'object' && 'toString' in obj.id) {
      (obj as Record<string, unknown>).id = (obj.id as { toString(): string }).toString()
    }
  }

  if (Array.isArray(obj)) {
    return obj.map(item => convertToPlainObject(item))
  }

  if (typeof obj === 'object') {
    const result: Record<string, unknown> = {}
    
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key]
        
        if (value && typeof value === 'object' && value.constructor.name === 'ObjectId') {
          result[key] = value.toString()
        } else if (value instanceof Date) {
          result[key] = value.toISOString()
        } else if (Buffer.isBuffer(value)) {
          result[key] = null
        } else {
          result[key] = convertToPlainObject(value)
        }
      }
    }
    
    return result
  }

  return obj
}