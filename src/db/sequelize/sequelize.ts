import * as dotenv from "dotenv"
import { Sequelize } from "sequelize";

dotenv.config() //Initialize Dot Environment

//Populate Sequelize Object with Mysql configuration details
export const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE_DATABASE || "axle",
    process.env.MYSQL_DATABASE_USER || 'root',
    process.env.MYSQL_DATABASE_PASSWORD,
    {
        host: process.env.MYSQL_DATABASE_HOST || 'localhost',
        dialect: 'mysql'
    }
);