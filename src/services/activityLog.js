const httpStatus = require("http-status");
const { ActivityLog } = require("../models");
const ApiError = require("../utils/ApiError");

exports.add = async (body) => {
  return new Promise((resolve, reject) => {
    ActivityLog.create(body, (err, data) => {
      if (err) {
        return reject(
          new ApiError(
            httpStatus.BAD_REQUEST,
            "Unable to save the activity log",
            err
          )
        );
      }
      resolve(data);
    });
  });
};
