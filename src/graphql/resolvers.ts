import { CountryCode, User, UserAddress } from "../db/sequelize/models";
import { generateRandomOTP } from "../helpers/OtpGenerator";
import { generateJWT } from "../helpers/TokenGenerator";
import { OTP } from "../mongoose/mongoose";
import jwt from 'jsonwebtoken';
import { GenerateOTPResolverObject, UpdateUserResolverObject, UserAddressModel, UserAddressResolverObject, UserModel, UserRegistrationObject, UserResolverObject, VerifyOTPResolverObject } from "./resolverObjects";

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

    updateUser: async ({ id, phone_number, email, first_name, last_name, terms_accepted, location_access_granted, push_notifications_enabled }: UpdateUserResolverObject) => {
        try {
            const user = await User.findByPk(id) as UserModel; // Find the user by their primary key (id)
    
            if (!user) {
                throw new Error('User not found'); // Handle the case where the user doesn't exist
            }
    
            // Update the user's properties
            if (phone_number !== undefined) user.phone_number = phone_number; // Only update if a new value is provided
            if (email !== undefined) user.email = email;
            if (first_name !== undefined) user.first_name = first_name;
            if (last_name !== undefined) user.last_name = last_name;
            if (terms_accepted !== undefined) user.terms_accepted = terms_accepted;
            if (location_access_granted !== undefined) user.location_access_granted = location_access_granted;
            if (push_notifications_enabled !== undefined) user.push_notifications_enabled = push_notifications_enabled;
    
            await user.save(); // Save the changes to the database
    
            return user; // Return the updated user
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Failed to update user');
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

    //CheckUser Resolver
    checkUserRegistration : async ({ phoneNumber }: UserRegistrationObject) => {
        try {
            const user = await User.findOne({ where: { phone_number: phoneNumber } }) as UserModel;
            const userExists = !!user; // Convert user to boolean (true if exists, false if null)
    
            let personalDetailsComplete = false;
            if (user) {
                // Check if personal details are complete
                personalDetailsComplete = !!(user.first_name && user.last_name && user.email);
            }
    
            let addressDetailsComplete = false;
            if (user) {
                const address = await UserAddress.findOne({ where: { user_id: user.id } }) as UserAddressModel;
                addressDetailsComplete = !!address; // True if an address exists
            }

            const isRegistrationComplete = userExists && personalDetailsComplete;
    
            return {
                userExists,
                personalDetailsComplete,
                addressDetailsComplete,
                user: isRegistrationComplete ? user : null
            };
        } catch (error) {
            console.error('Error checking user registration:', error);
            throw new Error('Failed to check user registration');
        }
    },

    //GenerateOTP Resolver
    generateOTP: async ({ phone_number }: GenerateOTPResolverObject) => {
        try {
            // Delete any existing OTP for this phone number
            await OTP.deleteMany({ phone_number });

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

    //VerifyOTP Resolver
    verifyOTP: async ({ phone_number, otp, token }: VerifyOTPResolverObject) => {
        try {
            // Find the OTP record in MongoDB
            const otpRecord = await OTP.findOne({ phone_number, otp });
            
            if (!otpRecord) {
                return { success: false, message: 'Invalid OTP!' };
            }

            // Verify the JWT
            try {
                jwt.verify(`${token}`, process.env.JWT_SECRET || '');
            } catch (jwtError) {
                return { success: false, message: 'Invalid or expired token.' };
            }

            // OTP and token are valid
            await OTP.deleteOne({ _id: otpRecord._id });
            return { success: true, message: 'OTP verified successfully.' };

        } catch (error) {
            console.error('Error verifying OTP:', error);
            throw new Error('Failed to verify OTP');
        }
    },
};