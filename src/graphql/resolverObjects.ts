import { Model } from "sequelize";

export interface UserResolverObject {
    phone_number: String,
    email: String,
    first_name: String,
    last_name: String,
    terms_accepted: String,
    location_access_granted: Boolean,
    push_notifications_enabled: Boolean

}

export interface UserRegistrationObject {
    phoneNumber: String
}

export interface UpdateUserResolverObject {
    id: number,
    phone_number: string,
    email: string,
    first_name: string,
    last_name: string,
    terms_accepted: boolean,
    location_access_granted: boolean,
    push_notifications_enabled: boolean
}

export interface UserAttributes {
    id: number;
    phone_number: string;
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    terms_accepted?: boolean | null;
    location_access_granted?: boolean | null;
    push_notifications_enabled?: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserAddressAttributes {
    id: number;
    user_id: number;
    apt_suite_floor?: string | null;
    business_building_name?: string | null;
    delivery_option?: string | null;
    label?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    address_line1?: string | null;
    address_line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
    is_default?: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export interface UserAddressModel extends Model<UserAddressAttributes>, UserAddressAttributes {}

export interface UserAddressResolverObject {
    user_id: String,
    apt_suite_floor: String,
    business_building_name: String,
    delivery_option: String,
    label: String,
    latitude: Number,
    longitude: Number,
    address_line1: String,
    address_line2: String,
    city: String,
    state: String,
    postal_code: String,
    country: String,
    is_default: Boolean
}

export interface GenerateOTPResolverObject {
    phone_number: String
}

export interface VerifyOTPResolverObject {
    phone_number: String,
    otp: String,
    token: String
}