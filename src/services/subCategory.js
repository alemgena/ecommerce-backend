const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Subcategory } = require("../models");

exports.add = async (body) => {
  return new Promise(async (resolve, reject) => {
    if (await Subcategory.isNameTaken(body.name)) {
      return reject(
        new ApiError(
          httpStatus.BAD_REQUEST,
          "sub category with this name already exist"
        )
      );
    }
    Subcategory.create(body, (err, data) => {
      if (err) {
        return reject(
          new ApiError(
            httpStatus.NOT_FOUND,
            "Error adding the sub category",
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
    Subcategory.findById(id, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(
            httpStatus.NOT_FOUND,
            "Unable to find the sub category",
            err
          )
        );
      }
      if (!data) {
        return reject(
          new ApiError(httpStatus.NOT_FOUND, "Sub category not found")
        );
      }
      data.deletedAt = Date.now();
      await data.save();
      resolve(data);
    });
  });
};

exports.update = async (id, updateBody) => {
  return new Promise((resolve, reject) => {
    Subcategory.findById(id, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(
            httpStatus.NOT_FOUND,
            "Error finding the sub category",
            err
          )
        );
      }
      if (!data) {
        return reject(
          new ApiError(httpStatus.NOT_FOUND, "Sub category not found")
        );
      }
      if (data.name && (await Subcategory.isNameTaken(data.name, id))) {
        return reject(
          new ApiError(
            httpStatus.BAD_REQUEST,
            "sub category with this name already exist"
          )
        );
      }
      Object.assign(data, updateBody);
      data.save();
      resolve(data);
    });
  });
};
exports.get = async (id) => {
  return new Promise((resolve, reject) => {
    Subcategory.findById(id)
      .populate("product")
      .exec(async (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Error finding the sub category",
              err
            )
          );
        }
        if (!data) {
          return reject(
            new ApiError(httpStatus.NOT_FOUND, "Sub category not found")
          );
        }
        resolve(data);
      });
  });
};
