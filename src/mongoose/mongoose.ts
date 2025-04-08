import mongoose from "mongoose";
import { OTPDocument } from "./documents";
import { OTPSchema } from "./schema";

export const OTP = mongoose.model<OTPDocument>('OTP', OTPSchema);