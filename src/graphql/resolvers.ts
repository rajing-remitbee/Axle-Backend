import { CountryCode, User, UserAddress } from "../db/sequelize/models";
import { generateRandomOTP } from "../helpers/OtpGenerator";
import { generateJWT } from "../helpers/TokenGenerator";
import { OTP } from "../mongoose/mongoose";
import { GenerateOTPResolverObject, UserAddressResolverObject, UserResolverObject } from "./resolverObjects";

//Resolvers
export const root = {
    //CountryCodes Resolver
    countryCodes: async () => {
        try {
            //Fetch results using Sequelize
            const results = await CountryCode.findAll();
            return results; //Results
        } catch (error) {
            //Error Handling
            console.error('Error fetching country codes:', error);
            throw new Error('Failed to fetch country codes');
        }
    },

    //CreateUser Resolver
    createUser: async ({ phone_number, email, first_name, last_name, terms_accepted, location_access_granted, push_notifications_enabled }: UserResolverObject) => {
        try {
            const user = await User.create({
                phone_number,
                email,
                first_name,
                last_name,
                terms_accepted,
                location_access_granted,
                push_notifications_enabled,
            });
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    },

    //CreateAddress Resolver
    createUserAddress: async ({ user_id, apt_suite_floor, business_building_name, delivery_option, label, latitude, longitude, address_line1, address_line2, city, state, postal_code, country, is_default }: UserAddressResolverObject) => {
        try {
            const address = await UserAddress.create({
                user_id,
                apt_suite_floor,
                business_building_name,
                delivery_option,
                label,
                latitude,
                longitude,
                address_line1,
                address_line2,
                city,
                state,
                postal_code,
                country,
                is_default,
            });
            return address;
        } catch (error) {
            console.error('Error creating user address:', error);
            throw new Error('Failed to create user address');
        }
    },

    generateOTP: async ({ phone_number }: GenerateOTPResolverObject) => {
        try {
            const otp = generateRandomOTP();
            const tokenPayload = { phone_number, otp };
            const token = generateJWT(tokenPayload);

            const newOTP = new OTP({ phone_number, otp, token });
            await newOTP.save();

            console.log(`Generated OTP for ${phone_number}: ${otp}`);

            return { otp, token };
        } catch (error) {
            console.error('Error generating OTP:', error);
            throw new Error('Failed to generate OTP');
        }
    },
};