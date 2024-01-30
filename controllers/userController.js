const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

function createUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'Route is not defined yet',
  });
}
function getUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'Route is not defined yet',
  });
}
function updateUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'Route is not defined yet',
  });
}
function deleteUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'Route is not defined yet',
  });
}

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
