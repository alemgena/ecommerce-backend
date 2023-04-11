const httpStatus = require("http-status");
const { HouseAdvertisement } = require("../models");
const ApiError = require("../utils/ApiError")

exports.add = async (body) => {
    return new Promise(async(resolve, reject) => {
      HouseAdvertisement.create(body, (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Error adding the  advertisement",
              err
            )
          );
        }
        resolve(data);
      });
    });
  };
  exports.delete = async (id) => {
    return new Promise((resolve, reject) => {
      HouseAdvertisement.findById(id, async (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Unable to find the  advertisement",
              err
            )
          );
        }
        if (!data) {
          return reject(
            new ApiError(httpStatus.NOT_FOUND, "advertisement")
          );
        }
        await data.delete();
        resolve(data);
      });
    });
  };
  
  exports.update = async (id, updateBody) => {
    return new Promise((resolve, reject) => {
      HouseAdvertisement.findById(id, async(err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Error finding the advertisement ",
              err
            )
          );
        }
        if (!data) {
          return reject(
            new ApiError(httpStatus.NOT_FOUND, "advertisement not found")
          );
        }
        Object.assign(data, updateBody);
      await data.save();
        resolve(data);
      });
    });
  };
  exports.get = async (id) => {
    return new Promise((resolve, reject) => {
        HouseAdvertisement
        .findById(id)
        .exec(async (err, data) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.NOT_FOUND,
                "Error finding the advertisement",
                err
              )
            );
          }
          if (!data) {
            return reject(
              new ApiError(httpStatus.NOT_FOUND, "advertisement  not found")
            );
          }
          resolve(data);
        });
    });
  };
  exports.list = async () => {
    return new Promise((resolve, reject) => {
      HouseAdvertisement
        .find({})
        .exec(async (err, data) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.NOT_FOUND,
                "Error finding the advertisement",
                err
              )
            );
          }
          if (!data) {
            return reject(
              new ApiError(httpStatus.NOT_FOUND, "advertisement not found")
            );
          }
          resolve(data);
        });
    });
  };
  