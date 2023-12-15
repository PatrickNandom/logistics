const jwtUtils = require('../utils/jwtUtils');

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }

    try {
        const decoded = jwtUtils.verifyToken(token);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};

module.exports = authenticateUser;
