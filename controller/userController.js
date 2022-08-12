const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const sanitizeBodyData = (bodyData, ...approvedFields) => {
  const updateData = {};
  Object.keys(bodyData).forEach((el) => {
    if (approvedFields.includes(el)) {
      updateData[el] = bodyData[el];
    }
  });
  return updateData;
};

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    dataCount: users.length,
    data: {
      users,
    },
  });
});

exports.pauseMessage = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user.id,
    { messagePaused: true },
    { runValidators: true }
  );
  res.status(200).json({
    status: 'success',
    message: 'Email messages paused successfully.',
  });
});

exports.continueMessage = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user.id,
    { messagePaused: false },
    { runValidators: true }
  );
  res.status(200).json({
    status: 'success',
    message: 'Email messages has successfully continued.',
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This is not the route for update password. Please, use /update-password',
        400
      )
    );
  }

  const updatedUser = sanitizeBodyData(req.body, 'name', 'email');

  const user = await User.findByIdAndUpdate(req.user.id, updatedUser, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findOneAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findOneAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
