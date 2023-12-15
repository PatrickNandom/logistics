const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const driverController = require('../controllers/driverController');
const adminController = require('../controllers/adminController');
// const authenticateUser = require('../middleware/authMiddleware')
const authenticateUser = require('../middleware/authMiddleware');


// User routes
router.post('/register', userController.register);
router.post('/login', authenticateUser, userController.login);
router.post('/place-order/:userId', userController.placeOrder);
router.post('/pay-for-services', authenticateUser, userController.payForServices);
router.post('/mark-delivery', authenticateUser, userController.markDelivery);
router.post('/leave-review', authenticateUser, userController.leaveReview);
router.get('/track-packages', authenticateUser, userController.trackPackages);
router.get('/singleUser/:userId', authenticateUser, userController.getUserById);

// Driver routes
router.get('/get-current-packages', authenticateUser, driverController.getCurrentPackages);
router.post('/mark-in-transit', authenticateUser, driverController.markInTransit);
router.post('/update-delivery-status', authenticateUser, driverController.updateDeliveryStatus);

// Admin routes
router.get('/verify-driver-accounts', authenticateUser, adminController.verifyDriverAccounts);
router.post('/verify-package-delivery-request', authenticateUser, adminController.verifyPackageDeliveryRequest);
router.get('/live-updates', authenticateUser, adminController.liveUpdates);
router.post('/remove-driver-account', authenticateUser, adminController.removeDriverAccount);
router.post('/set-accepting-new-packages', authenticateUser, adminController.setAcceptingNewPackages);

module.exports = router;
