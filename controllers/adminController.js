const Admin = require('../models/Admin');
const Driver = require('../models/Driver');
const Package = require('../models/Package');
const jwtUtils = require('../utils/jwtUtils');

// Verify Driver Accounts
exports.verifyDriverAccounts = async (req, res) => {
    try {
        // Assuming you have middleware to check if the user is an admin
        const adminId = req.user.adminId;

        // Retrieve all unverified driver accounts
        const unverifiedDrivers = await Driver.findAll({ where: { isValid: false } });

        res.json(unverifiedDrivers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Verify/Accept Package Delivery Request
exports.verifyPackageDeliveryRequest = async (req, res) => {
    try {
        const { packageId, accept } = req.body;

        // Retrieve package from the database
        const package = await Package.findByPk(packageId);

        // Update package status based on acceptance
        package.status = accept ? 'accepted' : 'rejected';
        await package.save();

        res.status(200).json({ message: 'Package status updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// See Live Update of All Packages and Status
exports.liveUpdates = async (req, res) => {
    try {
        // Assuming you have WebSocket functionality for live updates
        // WebSocket logic here

        res.status(200).json({ message: 'Live updates initiated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Remove a Driver Account
exports.removeDriverAccount = async (req, res) => {
    try {
        const { driverId } = req.body;

        // Retrieve and delete the driver account
        await Driver.destroy({ where: { driverId } });

        res.status(200).json({ message: 'Driver account removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Set Whether the Company is Accepting New Packages
exports.setAcceptingNewPackages = async (req, res) => {
    try {
        const { acceptingNewPackages } = req.body;

        // Update the company's status
        // Assuming you have a Company model with a field like acceptingPackages
        // Set the value based on the acceptingNewPackages variable

        res.status(200).json({ message: 'Company status updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

