export interface UserResolverObject {
    phone_number: String,
    email: String,
    first_name: String,
    last_name: String,
    terms_accepted: String,
    location_access_granted: Boolean,
    push_notifications_enabled: Boolean

}

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