import { PoolConnection } from "mysql2/promise";
import { getConnection } from "../db/database";
import { RowDataPacket } from 'mysql2';
import { CountryCode } from "../db/sequelize";

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
};