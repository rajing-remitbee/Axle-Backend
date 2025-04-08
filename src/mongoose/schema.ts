import { Schema } from "mongoose";

export const OTPSchema: Schema = new Schema({
    phone_number: { type: String, required: true, index: true },
    otp: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: '5m' },
});