const User = require('../models/User');
const Package = require('../models/Package');
const stripe = require('../utils/stripeUtils');
const jwtUtils = require('../utils/jwtUtils');
const bcrypt = require('bcrypt')
// signup  user function
exports.register = async (req, res) => {
    try {
        const { name, password, confirmPassword, email } = req.body;

        const user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(409).json({ message: 'user already exist' })
        }


        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const userRegisterd = await User.create({ name, password: hashedPassword, email });

        res.status(201).json(userRegisterd);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




// Login function for a user
exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the entered password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If the password matches, generate a JWT token
        const token = jwtUtils.generateUserToken(user.id);

        // Send the token in the response
        res.status(200).json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//get user by Id function
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Place Delivery Order
exports.placeOrder = async (req, res) => {
    try {
        //  middleware to extract user info from JWT
        //to be implemented



        const userId = req.params.userId;
        const { pickupLocation, deliveryLocation, description } = req.body;

        const package = await Package.create({
            userId,
            pickupLocation,
            deliveryLocation,
            description,
        });

        res.status(201).json(package);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Pay for Services
exports.payForServices = async (req, res) => {
    try {
        const { packageId, paymentToken } = req.body;

        // Retrieve package details from the database
        const package = await Package.findByPk(packageId);

        // Charge the user using Stripe
        const paymentIntent = await stripe.chargeCustomer(paymentToken, package);

        // Update package payment status
        package.paymentStatus = 'paid';
        await package.save();

        res.status(200).json({ message: 'Payment successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Track Current Packages
exports.trackPackages = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Retrieve all packages for the user
        const packages = await Package.findAll({ where: { userId } });

        res.json(packages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Mark Delivery
exports.markDelivery = async (req, res) => {
    try {
        const { packageId, isSuccess } = req.body;

        // Retrieve package from the database
        const package = await Package.findByPk(packageId);

        // Update package status based on success
        package.status = isSuccess ? 'delivered' : 'failed';
        await package.save();

        res.status(200).json({ message: 'Delivery marked' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Leave Review
exports.leaveReview = async (req, res) => {
    try {
        const { packageId, review } = req.body;

        // Update package with the review
        const package = await Package.findByPk(packageId);
        package.review = review;
        await package.save();

        res.status(200).json({ message: 'Review submitted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

