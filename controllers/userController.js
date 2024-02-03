const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...fields) => {
  const newObj = { ...obj };
  Object.keys(obj).forEach((key) => {
    if (!fields.includes(key)) {
      delete newObj[key];
    }
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for a password update. Please use /updateMyPassword route',
        400,
      ),
    );

  const filteredBody = filterObj(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.createUser = catchAsync(async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route is not defined yet',
  });
});

exports.getUser = catchAsync(async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route is not defined yet',
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route is not defined yet',
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route is not defined yet',
  });
});
