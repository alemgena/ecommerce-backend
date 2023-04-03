const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Region } = require("../models");

exports.add = async (body) => {
    return new Promise(async(resolve, reject) => {
      if (await Region.isNameTaken(body.name)) {
        return reject(
          new ApiError(
            httpStatus.BAD_REQUEST,
            "Region  already exist"
          )
        );
      }
      Region.create(body, (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Error adding region",
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
      Region.findById(id, async (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Unable to find region",
              err
            )
          );
        }
        if (!data) {
          return reject(
            new ApiError(httpStatus.NOT_FOUND, "Region not found")
          );
        }
        await data.delete();
        resolve(data);
      });
    });
  };
  
  exports.update = async (id, updateBody) => {
    return new Promise((resolve, reject) => {
      Region.findById(id, async(err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Error finding  region ",
              err
            )
          );
        }
        if (!data) {
          return reject(
            new ApiError(httpStatus.NOT_FOUND, "region not found")
          );
        }
        if (await Region.isNameTaken(updateBody.name)) {
          return reject(
            new ApiError(
              httpStatus.BAD_REQUEST,
              "Region with this name already exist"
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
      Region
        .findById(id)
        .exec(async (err, data) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.NOT_FOUND,
                "Error finding the region",
                err
              )
            );
          }
          if (!data) {
            return reject(
              new ApiError(httpStatus.NOT_FOUND, "region  not found")
            );
          }
          resolve(data);
        });
    });
  };
  exports.list = async () => {
    return new Promise((resolve, reject) => {
      Region
        .find({})
        .exec(async (err, data) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.NOT_FOUND,
                "Error finding the region",
                err
              )
            );
          }
          if (!data) {
            return reject(
              new ApiError(httpStatus.NOT_FOUND, "regions not found")
            );
          }
          resolve(data);
        });
    });
  };
  