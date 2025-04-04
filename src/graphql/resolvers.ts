import { PoolConnection } from "mysql2/promise";
import { getConnection } from "../db/database";
import { RowDataPacket } from 'mysql2';

//Resolvers
export const root = {
    //CountryCodes Resolver
    countryCodes: async () => {
        const connection = await getConnection() as PoolConnection; //DB Connection
        try {
            const [results] = await connection.execute<RowDataPacket[]>('SELECT * FROM country_codes'); //Execute query
            return results; //Results
        } finally {
            connection.release();
        }
    },
};