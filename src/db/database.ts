import mysql, { Connection, Pool } from "mysql2/promise";

var pool: Pool | null //Connection Pool

//Get Connection Method
export const getConnection = async (): Promise<Connection> => {
    //Check for environment variables
    if (!process.env.MYSQL_DATABASE_HOST || !process.env.MYSQL_DATABASE_USER || !process.env.MYSQL_DATABASE_PASSWORD || !process.env.MYSQL_DATABASE_DATABASE) {
        throw new Error("Missing MySQL database environment variables.");
    }

    //Attempt connection with MySQL DB
    if (!pool) {
        //Create connection pool
        pool = mysql.createPool({ host: process.env.MYSQL_DATABASE_HOST, user: process.env.MYSQL_DATABASE_USER, password: process.env.MYSQL_DATABASE_PASSWORD, database: process.env.MYSQL_DATABASE_DATABASE, connectionLimit: 10 });
        console.log("MySQL connection pool created.")
    }

    try {
        //Attempt connection
        const connection = await pool.getConnection();
        return connection;
    } catch (err) {
        console.error("Error getting MySQL connection:", err);
        throw err;
    }
};

//Close Connection Method
export const closeConnection = async (): Promise<void> => {
    if (pool) {
        await pool.end(); //End connection pool
        console.log("MySQL connection pool closed.");
        pool = null; // Reset connection pool.
    }
};