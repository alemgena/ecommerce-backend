const httpStatus = require("http-status");
const { Favourite } = require("../models");
const ApiError = require("../utils/ApiError");

exports.add = async (favouriteBody) => {
    return new Promise(async (resolve, reject) => {
        if (await Favourite.isProductAdd(favouriteBody)) {
          return reject(
            new ApiError(
              httpStatus.BAD_REQUEST,
              "product already add to the favourite list"
            )
          );
        }
        Favourite.create(favouriteBody, (err, data) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.NOT_FOUND,
                "Error adding the the product into the favourite list",
                err
              )
            );
          }
          resolve(data);
        });
      });
};
exports.get = async (id) => {
  console.log(id)
  return new Promise((resolve, reject) => {
    Favourite.find({user:id})
      .populate("product")
      .exec(async (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Error finding the Favourite",
              err
            )
          );
        }
        if (!data) {
          return reject(
            new ApiError(httpStatus.NOT_FOUND, "Favourite not found")
          );
        }
        resolve(data);
      });
  });
};