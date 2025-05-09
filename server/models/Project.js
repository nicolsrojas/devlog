const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true, // Garantiza que no haya duplicados globalmente
  },
  description: {
    type: String,
    trim: true,
  },
  technologies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Technology',
      required: true,
    }
  ],
  repositoryUrl: {
    type: String,
    trim: true,
  },
  liveUrl: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  documentation: [
    {
      index: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Middleware para crear el slug automáticamente antes de guardar
ProjectSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
