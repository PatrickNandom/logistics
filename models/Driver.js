const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../database/db');

const Driver = sequelize.define('Driver', {
    driverId: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    isValid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

Driver.sync({ force: false }).then(() => {
    console.log('Driver table created successfully');
})

module.exports = Driver;
