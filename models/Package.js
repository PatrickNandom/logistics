const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../database/db');

const Package = sequelize.define('Package', {
    packageId: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    driverId: {
        type: DataTypes.UUID,
    },
    pickupLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deliveryLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'in-progress',
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'unpaid',
    },
});

Package.sync({ force: false }).then(() => {
    console.log('Package table created successfully');
})

// Set up associations
// Package.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// Package.belongsTo(Driver, { foreignKey: 'driverId', as: 'driver' });

module.exports = Package;
