const express = require('express');

const userController = require('../controller/userController');
const authController = require('../controller/authController');

const {
  getUsers,
  getUser,
  updateMe,
  deleteMe,
  deleteUser,
  pauseMessage,
  continueMessage,
} = userController;

const {
  protect,
  restrictTo,
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = authController;

// USERS ROUTES
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

router.patch('/update-password', protect, updatePassword);
router.delete('/delete-me', protect, deleteMe);

router.patch('/update-user', protect, updateMe);

router.patch('/pause-message', protect, pauseMessage);
router.patch('/continue-message', protect, continueMessage);

router.route('/').get(protect, restrictTo('admin'), getUsers);

router
  .route('/:id')
  .get(restrictTo('admin'), protect, getUser)
  .delete(restrictTo('admin'), protect, deleteUser);

module.exports = router;