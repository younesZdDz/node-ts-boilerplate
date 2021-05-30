import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { DateTime } from 'luxon';

export interface IRoom extends Document {
    title: string;
    description: string;
    imagePreview: string;
    createdBy: ObjectId;
    messages: {
        sentBy: ObjectId;
        content: string;
        createdAt: number;
    }[];
    createdAt: number;
}

const roomSchema = new Schema({
    title: { type: String },
    description: { type: String },
    imagePreview: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    messages: [
        {
            sentBy: { type: Schema.Types.ObjectId, ref: 'User' },
            content: { type: String },
            createdAt: { type: Number, default: DateTime.utc().toSeconds() },
        },
    ],
});

const model = mongoose.model<IRoom>('Room', roomSchema);

export default model;
