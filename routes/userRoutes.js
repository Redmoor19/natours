const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const {
  signUp,
  logIn,
  resetPassword,
  forgotPassword,
} = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/login', logIn);
router.patch('/resetPassword/:token', resetPassword);
router.post('/forgotPassword', forgotPassword);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
