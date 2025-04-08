import { DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

//Create Sequelize CountryCode Object
export const CountryCode = sequelize.define('CountryCode',
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

//Create Sequelize User Object
export const User = sequelize.define('User',
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

//Create Sequelize UserAddress Object
export const UserAddress = sequelize.define('UserAddress',
    {
        user_id: { type: DataTypes.NUMBER },
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