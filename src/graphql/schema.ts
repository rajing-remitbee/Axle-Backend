import { buildSchema } from 'graphql';

export const schema = buildSchema(`
    type CountryCode {
        id: Int!
        name: String!
        dialcode: String!
        countrycode: String!
    }

    type User {
        id: Int!
        phone_number: String!
        email: String
        first_name: String
        last_name: String
        terms_accepted: Boolean
        location_access_granted: Boolean
        push_notifications_enabled: Boolean
    }

    type UserAddress {
        id: Int!
        user_id: Int!
        apt_suite_floor: String
        business_building_name: String
        delivery_option: String
        label: String
        latitude: Float
        longitude: Float
        address_line1: String
        address_line2: String
        city: String
        state: String
        postal_code: String
        country: String
        is_default: Boolean
    }

    type Query {
        countryCodes: [CountryCode!]!
    }

    type Mutation {
        createUser(
            phone_number: String!
            email: String
            first_name: String
            last_name: String
            terms_accepted: Boolean
            location_access_granted: Boolean
            push_notifications_enabled: Boolean
        ): User

        createUserAddress(
            user_id: Int!
            apt_suite_floor: String
            business_building_name: String
            delivery_option: String
            label: String
            latitude: Float
            longitude: Float
            address_line1: String
            address_line2: String
            city: String
            state: String
            postal_code: String
            country: String
            is_default: Boolean
        ): UserAddress
    }
`);