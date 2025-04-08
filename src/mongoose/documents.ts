export interface OTPDocument extends Document {
    phone_number: string;
    otp: string;
    token: string;
    createdAt: Date;
}