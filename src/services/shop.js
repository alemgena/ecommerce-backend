const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Shop } = require("../models");

exports.add = async (body) => {
    return new Promise(async(resolve, reject) => {
      if (await Shop.isNameTaken(body.name)) {
        return reject(
          new ApiError(
            httpStatus.BAD_REQUEST,
            "Shop name already exist"
          )
        );
      }
      Shop.create(body, (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Error adding the  shop",
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
      Shop.findById(id, async (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Unable to find the  shop",
              err
            )
          );
        }
        if (!data) {
          return reject(
            new ApiError(httpStatus.NOT_FOUND, "Shop not found")
          );
        }
        await data.delete();
        resolve(data);
      });
    });
  };
  
  exports.update = async (id, updateBody) => {
    return new Promise((resolve, reject) => {
      Shop.findById(id, async(err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Error finding the shop ",
              err
            )
          );
        }
        if (!data) {
          return reject(
            new ApiError(httpStatus.NOT_FOUND, "Shop not found")
          );
        }
        if (await Shop.isNameTaken(updateBody.name)) {
          return reject(
            new ApiError(
              httpStatus.BAD_REQUEST,
              "Shop with this name already exist"
            )
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
      Shop
        .findById(id)
        .exec(async (err, data) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.NOT_FOUND,
                "Error finding the shop",
                err
              )
            );
          }
          if (!data) {
            return reject(
              new ApiError(httpStatus.NOT_FOUND, "Shop  not found")
            );
          }
          resolve(data);
        });
    });
  };
  exports.list = async () => {
    return new Promise((resolve, reject) => {
      Shop
        .find({})
        .exec(async (err, data) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.NOT_FOUND,
                "Error finding the shop",
                err
              )
            );
          }
          if (!data) {
            return reject(
              new ApiError(httpStatus.NOT_FOUND, "Shop not found")
            );
          }
          resolve(data);
        });
    });
  };
  