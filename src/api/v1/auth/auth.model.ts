import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import config from '../../../config';

export interface IUser extends Document {
    email: string;
    password: string;
    sessions: {
        token: string;
        tokenExpiresIn: number;
        socketId?: string;
    }[];
    createdAt: number;
    updatedAt: number;
    passwordMatches: (password: string) => boolean;
    token: () => string;
}

export const userSchema = new Schema<IUser>({
    email: { type: String },
    password: { type: String },
    sessions: [
        {
            token: { type: String },
            tokenExpiresIn: { type: Number },
            socketId: { type: String },
        },
    ],
    createdAt: {
        default: DateTime.utc().toSeconds(),
        type: Number,
    },
    updatedAt: {
        default: DateTime.utc().toSeconds(),
        type: Number,
    },
    role: {
        default: 'user',
        enum: ['user'],
        type: String,
    },
});

userSchema.pre('save', async function save(next) {
    try {
        if (!this.isModified('password')) return next();

        const rounds = config.SERVER.env === 'test' ? 1 : 10;
        const hash = await bcrypt.hash(this.password, rounds);
        this.password = hash;

        return next();
    } catch (error) {
        return next(error);
    }
});

userSchema.method({
    async passwordMatches(password: string) {
        const result = await bcrypt.compare(password, this.password);

        return result;
    },
    token() {
        const date = DateTime.utc();
        const payload = {
            // eslint-disable-next-line no-underscore-dangle
            _id: this._id,
            exp: date.plus({ seconds: config.JWT.jwtTokenLife }).toSeconds(),
            iat: date.toSeconds(),
        };
        return jwt.sign(payload, config.JWT.jwtSecret as string);
    },
});

userSchema.index(
    {
        email: 1,
    },
    { unique: true },
);

const model = mongoose.model<IUser>('User', userSchema);

export default model;
