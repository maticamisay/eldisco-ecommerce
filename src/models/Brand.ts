import mongoose, { Document, Schema } from "mongoose"

export interface IBrand extends Document {
  nombre: string
  slug?: string
  descripcion?: string
  logo?: string
  createdAt: Date
  updatedAt: Date
}

const BrandSchema = new Schema<IBrand>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: false,
      trim: true,
      unique: true,
      sparse: true,
    },
    descripcion: {
      type: String,
      required: false,
      trim: true,
    },
    logo: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

BrandSchema.pre('save', function(next) {
  if (this.isModified('nombre') || !this.slug) {
    this.slug = generateSlug(this.nombre)
  }
  next()
})

BrandSchema.index({ nombre: 1 })
BrandSchema.index({ slug: 1 })

export default mongoose.models.Brand || mongoose.model<IBrand>("Brand", BrandSchema)