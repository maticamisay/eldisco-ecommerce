import mongoose, { Document, Schema } from "mongoose"

export interface ISubcategory {
  nombre: string
  umbralStockBajo?: number
}

export interface ICategory extends Document {
  nombre: string
  slug?: string
  umbralStockBajo?: number
  subcategorias: ISubcategory[]
  createdAt: Date
  updatedAt: Date
}

const SubcategorySchema = new Schema<ISubcategory>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    umbralStockBajo: {
      type: Number,
      required: false,
      min: 0,
    },
  },
  {
    _id: true,
  }
)

const CategorySchema = new Schema<ICategory>(
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
    umbralStockBajo: {
      type: Number,
      required: false,
      min: 0,
    },
    subcategorias: [SubcategorySchema],
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

CategorySchema.pre('save', function(next) {
  if (this.isModified('nombre') || !this.slug) {
    this.slug = generateSlug(this.nombre)
  }
  next()
})

CategorySchema.index({ nombre: 1 })
CategorySchema.index({ slug: 1 })
CategorySchema.index({ "subcategorias.nombre": 1 })

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema)