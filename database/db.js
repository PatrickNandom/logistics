const { Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

//importing models to establish relationship
// const { User, Driver, Admin } = require('./models')

require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.PASS_WORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_USER,
    define: {
        // Enable UUIDs for all models
        defaultScope: {
            rawAttributes: {
                id: {
                    type: Sequelize.UUID,
                    defaultValue: () => uuidv4(),
                    primaryKey: true,
                },
            },
        },
    },
});


// Test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// Sync models with the database
sequelize.sync()
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch((err) => {
        console.error('Error syncing models with the database:', err);
    });

// User.hasMany(Package, { foreignKey: 'userId', as: 'packages' });
// Driver.hasMany(Package, { foreignKey: 'driverId', as: 'assignedPackages' });
// Admin.hasMany(Driver, { foreignKey: 'adminId', as: 'drivers' });


module.exports = sequelize;
