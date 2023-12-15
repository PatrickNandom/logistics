const jwt = require('jsonwebtoken');


const secretKey = process.env.SECRET_KEY;
// Generate JWT for user
exports.generateUserToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

// Generate JWT for driver
exports.generateDriverToken = (driverId) => {
    return jwt.sign({ driverId }, secretKey, { expiresIn: '1h' });
};

// Generate JWT for admin
exports.generateAdminToken = (adminId) => {
    return jwt.sign({ adminId }, secretKey, { expiresIn: '1h' });
};

// Middleware to verify JWT
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
};

