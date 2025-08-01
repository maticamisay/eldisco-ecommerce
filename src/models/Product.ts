import mongoose, { Document, Schema } from "mongoose"

export interface IProductEspecificacion {
  especificacionId: string
  valor: string | number | boolean
}

export interface IProductImage {
  id: string
  filename: string
  originalName: string
  url: string
  size: number
  uploadDate: Date
  isPrimary: boolean
  alt?: string
}

export interface IProduct extends Document {
  nombre: string
  autogenerarNombre: boolean
  codigoBarras?: string
  codigosBarras: string[]
  codigoInterno: string
  codigoBarraPrincipal?: string
  marcaId: string
  precio: number
  iva: number
  proveedorId: string
  categoriaId: string
  subcategoriaIds: string[]
  especificaciones?: IProductEspecificacion[]
  imagenes?: IProductImage[]
  imagenPrincipal?: string
  stock: number
  umbralStockBajo: number
  activoEcommerce: boolean
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
      sparse: true,
    },
    codigosBarras: {
      type: [String],
      required: true,
      default: [],
    },
    codigoInterno: {
      type: String,
      required: true,
      trim: true,
      immutable: true,
    },
    codigoBarraPrincipal: {
      type: String,
      required: false,
      trim: true,
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
      default: 21,
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

ProductSchema.index({ nombre: 1 })
ProductSchema.index({ marcaId: 1 })
ProductSchema.index({ categoriaId: 1 })
ProductSchema.index({ proveedorId: 1 })
ProductSchema.index({ stock: 1 })
ProductSchema.index({ codigoInterno: 1 })
ProductSchema.index({ codigosBarras: 1 })
ProductSchema.index({ "especificaciones.especificacionId": 1 })
ProductSchema.index({ "especificaciones.valor": 1 })

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)