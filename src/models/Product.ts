import mongoose, { Document, Schema } from "mongoose"

export interface IProductEspecificacion {
  especificacionId: string
  valor: string | number | boolean
}

export interface IProductImage {
  id: string              // ID del archivo en File Manager API
  filename: string        // Nombre del archivo en S3
  originalName: string    // Nombre original del archivo
  url: string            // URL directa de S3
  size: number           // Tamaño en bytes
  uploadDate: Date       // Fecha de carga
  isPrimary: boolean     // Imagen principal del producto
  alt?: string           // Texto alternativo para accesibilidad
}

export interface IProduct extends Document {
  nombre: string
  autogenerarNombre: boolean
  codigoBarras?: string // Deprecated - kept for backward compatibility
  codigosBarras: string[] // Array of external barcodes
  codigoInterno: string // Auto-generated internal code
  codigoBarraPrincipal?: string // Reference to main barcode if exists
  marcaId: string
  precio: number
  iva: number
  proveedorId: string
  categoriaId: string
  subcategoriaIds: string[]
  especificaciones?: IProductEspecificacion[]
  imagenes?: IProductImage[]  // Array de imágenes del producto
  imagenPrincipal?: string    // ID de la imagen principal
  stock: number
  umbralStockBajo: number
  activoEcommerce: boolean    // Indica si el producto está activo para ecommerce
  createdAt: Date
  updatedAt: Date
}

const ProductEspecificacionSchema = new Schema({
  especificacionId: {
    type: String,
    required: true,
  },
  valor: {
    type: Schema.Types.Mixed,
    required: true,
  },
})

const ProductImageSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
    min: 0,
  },
  uploadDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
  alt: {
    type: String,
    required: false,
  }
})

const ProductSchema = new Schema<IProduct>(
  {
    nombre: {
      type: String,
      required: false,
      trim: true,
    },
    autogenerarNombre: {
      type: Boolean,
      required: true,
      default: false,
    },
    codigoBarras: {
      type: String,
      required: false,
      trim: true,
      sparse: true, // Deprecated - kept for backward compatibility
    },
    codigosBarras: {
      type: [String],
      required: true,
      default: [],
      validate: {
        validator: function(arr: string[]) {
          // Check for duplicates within the array
          return arr.length === new Set(arr).size;
        },
        message: 'No se permiten códigos de barras duplicados en el mismo producto'
      }
    },
    codigoInterno: {
      type: String,
      required: true,
      trim: true,
      immutable: true, // Prevent modification after creation
    },
    codigoBarraPrincipal: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function(value: string) {
          // If provided, must exist in codigosBarras array
          if (!value) return true;
          return this.codigosBarras && this.codigosBarras.includes(value);
        },
        message: 'El código de barras principal debe existir en la lista de códigos externos'
      }
    },
    marcaId: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    iva: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 21, // IVA estándar en Argentina
    },
    proveedorId: {
      type: String,
      required: true,
    },
    categoriaId: {
      type: String,
      required: true,
    },
    subcategoriaIds: [{
      type: String,
      required: true,
    }],
    especificaciones: [ProductEspecificacionSchema],
    imagenes: [ProductImageSchema],
    imagenPrincipal: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    umbralStockBajo: {
      type: Number,
      required: true,
      min: 0,
      default: 5,
    },
    activoEcommerce: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Función para generar código interno único
function generateInternalCode(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `PROD-${timestamp}-${random}`.toUpperCase();
}

// Pre-save middleware para generar código interno
ProductSchema.pre('save', async function(next) {
  const product = this as any;
  if (product.isNew && !product.codigoInterno) {
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 5;
    
    while (!isUnique && attempts < maxAttempts) {
      product.codigoInterno = generateInternalCode();
      const existing = await mongoose.models.Product.findOne({ codigoInterno: product.codigoInterno });
      if (!existing) {
        isUnique = true;
      }
      attempts++;
    }
    
    if (!isUnique) {
      throw new Error('No se pudo generar un código interno único');
    }
  }
  next();
});

// Validación personalizada para códigos de barras únicos entre productos
ProductSchema.pre('save', async function(next) {
  const product = this as any;
  if (product.codigosBarras && product.codigosBarras.length > 0) {
    for (const codigo of product.codigosBarras) {
      const existing = await mongoose.models.Product.findOne({
        $and: [
          { _id: { $ne: product._id } },
          {
            $or: [
              { codigosBarras: codigo },
              { codigoBarras: codigo } // Check legacy field too
            ]
          }
        ]
      });
      
      if (existing) {
        throw new Error(`El código de barras '${codigo}' ya está en uso por otro producto`);
      }
    }
  }
  next();
});

// Índices para mejorar las consultas
ProductSchema.index({ nombre: 1 })
ProductSchema.index({ marcaId: 1 })
ProductSchema.index({ categoriaId: 1 })
ProductSchema.index({ proveedorId: 1 })
ProductSchema.index({ stock: 1 })
ProductSchema.index({ codigoInterno: 1 }, { unique: true }) // Index for internal code with uniqueness
ProductSchema.index({ codigosBarras: 1 }) // Index for external barcodes
ProductSchema.index({ codigoBarras: 1 }, { unique: true, sparse: true }) // Legacy index with uniqueness
ProductSchema.index({ "especificaciones.especificacionId": 1 })
ProductSchema.index({ "especificaciones.valor": 1 })
ProductSchema.index({ "imagenes.id": 1 }) // Index for image IDs
ProductSchema.index({ imagenPrincipal: 1 }) // Index for primary image

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)