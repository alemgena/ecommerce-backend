const httpStatus = require("http-status");
const { Documents } = require("../models");
const ApiError = require("../utils/ApiError")

exports.add = async (body) => {
    return new Promise(async(resolve, reject) => {
      Documents.create(body, (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Error adding the  document",
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
      Documents.findById(id, async (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Unable to find the  document",
              err
            )
          );
        }
        if (!data) {
          return reject(
            new ApiError(httpStatus.NOT_FOUND, "document")
          );
        }
        await data.delete();
        resolve(data);
      });
    });
  };
  
  exports.update = async (id, updateBody) => {
    return new Promise((resolve, reject) => {
      Documents.findById(id, async(err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Error finding the document ",
              err
            )
          );
        }
        if (!data) {
          return reject(
            new ApiError(httpStatus.NOT_FOUND, "document not found")
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
        Documents
        .findById(id)
        .exec(async (err, data) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.NOT_FOUND,
                "Error finding the document",
                err
              )
            );
          }
          if (!data) {
            return reject(
              new ApiError(httpStatus.NOT_FOUND, "document  not found")
            );
          }
          resolve(data);
        });
    });
  };
  exports.list = async () => {
    return new Promise((resolve, reject) => {
      Documents
        .find({})
        .exec(async (err, data) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.NOT_FOUND,
                "Error finding the document",
                err
              )
            );
          }
          if (!data) {
            return reject(
              new ApiError(httpStatus.NOT_FOUND, "document not found")
            );
          }
          resolve(data);
        });
    });
  };
  