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
        resolve(data.populate("userID"));
      });
    });
  });
};

exports.query = async (filter, options) => {
  const newsLetters = await NewsLetter.paginate(filter, options);
  return newsLetters;
};
exports.unsubscribe = async (id) => {
  return new Promise((resolve, reject) => {
    NewsLetter.findOne({ userID: id }, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(httpStatus.BAD_REQUEST, "error unsubscribing", err)
        );
      }

      if (!data) {
        return reject(
          new ApiError(httpStatus.NOT_FOUND, "newsletter not found")
        );
      }
      await data.delete();
      resolve(data.populate("userID"));
    });
  });
};
exports.systemUnsubscribe = async (id) => {
  return new Promise((resolve, reject) => {
    NewsLetter.findOne({ _id: id }, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(httpStatus.BAD_REQUEST, "error unsubscribing", err)
        );
      }

      if (!data) {
        return reject(
          new ApiError(httpStatus.NOT_FOUND, "newsletter not found")
        );
      }
      await data.delete();
      resolve(data.populate("userID"));
    });
  });
};
