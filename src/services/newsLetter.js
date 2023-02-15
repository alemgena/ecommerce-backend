const httpStatus = require("http-status");
const { NewsLetter } = require("../models");
const ApiError = require("../utils/ApiError");

exports.add = async (userID) => {
  return new Promise((resolve, reject) => {
    NewsLetter.findOne({ userID }, (err, data) => {
      if (err) {
        return reject(
          new ApiError(httpStatus.BAD_REQUEST, "Error finding the user", err)
        );
      }
      if (data) {
        return reject(
          new ApiError(
            httpStatus.BAD_REQUEST,
            "You have already subscribed to our newletter"
          )
        );
      }
      NewsLetter.create({ userID }, (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.BAD_REQUEST,
              "Error subscribing the user",
              err
            )
          );
        }
        resolve(data.populate("User"));
      });
    });
  });
};
