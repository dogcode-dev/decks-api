import mongoose, { Schema, Document } from 'mongoose';

const normalize = require('normalize-mongoose');

export interface ICategory {
  id?: any;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoryDocument extends Document {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: false
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      required: false
    },
  },
  {
    timestamps: {},
  },
);

CategorySchema.plugin(normalize);

const model = mongoose.model<ICategoryDocument>('Category', CategorySchema);

export default model;
