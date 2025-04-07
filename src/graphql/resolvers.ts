import { CountryCode, User, UserAddress } from "../db/sequelize";
import { UserAddressResolverObject, UserResolverObject } from "./resolverObjects";

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
};