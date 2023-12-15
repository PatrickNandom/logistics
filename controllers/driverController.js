const Driver = require('../models/Driver');
const Package = require('../models/Package');
const jwtUtils = require('../utils/jwtUtils');

// See Current Packages
exports.getCurrentPackages = async (req, res) => {
    try {
        const driverId = req.user.driverId;

        // Retrieve all packages assigned to the driver
        const packages = await Package.findAll({ where: { driverId } });

        res.json(packages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Mark Packages as In-Progress/In-Transit
exports.markInTransit = async (req, res) => {
    try {
        const { packageId } = req.body;

        // Retrieve package from the database
        const package = await Package.findByPk(packageId);

        // Update package status to in-progress
        package.status = 'in-progress';
        await package.save();

        res.status(200).json({ message: 'Package marked as in-progress' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update Delivery Status
exports.updateDeliveryStatus = async (req, res) => {
    try {
        const { packageId, location, statusUpdate } = req.body;

        // Retrieve package from the database
        const package = await Package.findByPk(packageId);

        // Update package status and location
        package.status = statusUpdate;
        package.location = location;
        await package.save();

        res.status(200).json({ message: 'Delivery status updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

