const httpStatus = require("http-status");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
exports.changePassword = async (id, userBody) => {
  const user = await User.findById(id);
  if (!user || !(await user.isPasswordMatch(userBody.oldPassword))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect User or Password");
  }
  user.password = userBody.newPassword;
  await user.save();
  return user;
};
exports.activateAccount = async (id) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, " User Not Found ");
  }
  user.status = "ACTIVE";
  await user.save();
  return user;
};

exports.update = async (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(
            httpStatus.NOT_FOUND,
            "Error finding the user",
            err
          )
        );
      }
      if (!data) {
        return reject(
          new ApiError(httpStatus.NOT_FOUND, "User not found")
        );
      }
      Object.assign(data, userData);
      data.save();
      resolve(data);
    });
  });
};
exports.view = async (id) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "user not found");
  }
  return user;
};

exports.suspendAccount = async (id) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, " User Not Found ");
  }
  user.status = "SUSPENDED";
  await user.save();
  return user;
};
