import mongoose, { Schema, Document } from 'mongoose';

const normalize = require('normalize-mongoose');

export interface IUser {
  id?: any;
  name: string;
  nick: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends Document {
  name: string;
  nick: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    nick: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
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

UserSchema.plugin(normalize);

const model = mongoose.model<IUserDocument>('User', UserSchema);

export default model;
