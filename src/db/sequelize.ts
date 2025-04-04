import * as dotenv from "dotenv"
import { Sequelize, DataTypes } from "sequelize";

dotenv.config() //Initialize Dot Environment

//Populate Sequelize Object with Mysql configuration details
const sequelize = new Sequelize(process.env.MYSQL_DATABASE_DATABASE || "axle", process.env.MYSQL_DATABASE_USER || 'root', process.env.MYSQL_DATABASE_PASSWORD || '', { host: process.env.MYSQL_DATABASE_HOST || 'localhost', dialect: 'mysql' });

//Create Sequelize CountryCode Object
const CountryCode = sequelize.define('CountryCode', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dialcode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    countrycode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        tableName: 'country_codes',
        timestamps: false
    }
);

export { sequelize, CountryCode }