import mongoose, { Document, Schema } from "mongoose";
import { ICard } from "./Card";

const normalize = require('normalize-mongoose');

export interface IQuestion {
    id?: any,
    card: ICard,
    question: String,
    answer: String,
    createdAt?: Date;
    updatedAt?: Date;    
}

export interface IQuestionDocument extends Document {
    card: mongoose.Schema.Types.ObjectId,
    question: String,
    answer: String,
    createdAt?: Date;
    updatedAt?: Date;
}

const QuestionSchema = new Schema<IQuestionDocument>(
    {
        card: {
            type: Schema.Types.ObjectId,
            required: true,
        },    
        question: {
            type: String,
            required: true,
        },
        answer: {
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
        timestamps: true
    },
);

QuestionSchema.plugin(normalize);

const model = mongoose.model<IQuestionDocument>('Question', QuestionSchema);

export default model;