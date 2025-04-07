import * as dotenv from "dotenv"
import { Sequelize, DataTypes } from "sequelize";

dotenv.config() //Initialize Dot Environment

//Populate Sequelize Object with Mysql configuration details
const sequelize = new Sequelize(process.env.MYSQL_DATABASE_DATABASE || "axle", process.env.MYSQL_DATABASE_USER || 'root', process.env.MYSQL_DATABASE_PASSWORD || '', { host: process.env.MYSQL_DATABASE_HOST || 'localhost', dialect: 'mysql' });

//Create Sequelize CountryCode Object
const CountryCode = sequelize.define('CountryCode',
    {
        name: { type: DataTypes.STRING, allowNull: false },
        dialcode: { type: DataTypes.STRING, allowNull: false },
        countrycode: { type: DataTypes.STRING, allowNull: false },
    },
    {
        tableName: 'country_codes',
        timestamps: false
    }
);

const User = sequelize.define('User',
    {
        phone_number: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: { type: DataTypes.STRING, unique: true },
        first_name: { type: DataTypes.STRING },
        last_name: { type: DataTypes.STRING },
        terms_accepted: { type: DataTypes.BOOLEAN, defaultValue: false },
        location_access_granted: { type: DataTypes.BOOLEAN, defaultValue: false },
        push_notifications_enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
        tableName: 'users'
    }
);

const UserAddress = sequelize.define('UserAddress',
    {
        apt_suite_floor: { type: DataTypes.STRING },
        business_building_name: { type: DataTypes.STRING },
        delivery_option: { type: DataTypes.STRING },
        label: { type: DataTypes.STRING },
        latitude: { type: DataTypes.DECIMAL(10, 8) },
        longitude: { type: DataTypes.DECIMAL(11, 8) },
        address_line1: { type: DataTypes.STRING },
        address_line2: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        state: { type: DataTypes.STRING },
        postal_code: { type: DataTypes.STRING },
        country: { type: DataTypes.STRING },
        is_default: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
        tableName: 'user_addresses'
    }
);

User.hasMany(UserAddress, { foreignKey: 'user_id' });
UserAddress.belongsTo(User, { foreignKey: 'user_id' });

export { sequelize, CountryCode, User, UserAddress }