/* eslint-disable import/no-useless-path-segments */
const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router(); // Create new Router

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.use(authController.protect); // Protect all the other routes after this middleware

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin')); // All the routes are restricted only to admin

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
