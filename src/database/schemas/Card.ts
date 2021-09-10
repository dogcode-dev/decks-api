import mongoose, { Document, Schema } from "mongoose";
import { ICategory } from "./Category";
import { IUser } from "./User";

const normalize = require('normalize-mongoose');

export interface ICard {
    id?: any,
    name: String,
    category: ICategory,
    owner: IUser,
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICardDocument extends Document {
    name: String,
    category: mongoose.Schema.Types.ObjectId,
    owner: mongoose.Schema.Types.ObjectId,
    createdAt?: Date;
    updatedAt?: Date;
}


const CardSchema = new Schema<ICardDocument>(
    {
        name: {
            type: String,
            required: true,
        },    
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
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
    }
);

CardSchema.plugin(normalize);

const model = mongoose.model<ICardDocument>('Card', CardSchema);

export default model;