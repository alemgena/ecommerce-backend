const httpStatus = require("http-status");
const { OptionValue, ProductOption } = require("../models");
const ApiError = require("../utils/ApiError");

exports.add = async (oVID, body) => {
  return new Promise((resolve, reject) => {
    OptionValue.findOne({ _id: oVID }, async (err, opValue) => {
      if (err) {
        return reject(
          new ApiError(httpStatus.BAD_REQUEST, "Error finding the data", err)
        );
      }
      if (!opValue) {
        return reject(
          new ApiError(httpStatus.BAD_REQUEST, "Option value not found")
        );
      }
      ProductOption.findOne(
        { id: body.option, parentOption: opValue.option },
        (err, data) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.BAD_REQUEST,
                "Error finding the option value",
                err
              )
            );
          }
          if (!data) {
            return reject(
              new ApiError(
                httpStatus.BAD_REQUEST,
                "Option value doesn't exists"
              )
            );
          }
          const values = body.values.map((value) => ({
            option: body.option,
            value,
            parent_id: oVID,
          }));

          OptionValue.insertMany(values, (err, data) => {
            if (err) {
              return reject(
                new ApiError(
                  httpStatus.BAD_REQUEST,
                  "Error adding product option value",
                  err
                )
              );
            }

            resolve(data);
          });
        }
      );
    });
  });
};

exports.getSubOptions = (parent_id, option) => {
  return new Promise((resolve, reject) => {
    OptionValue.find({
      parent_id,
      option,
    }).exec(async (err, data) => {
      if (err) {
        reject(
          new ApiError(httpStatus.BAD_REQUEST, "error finding the data", err)
        );
      }
      if (!data) {
        return reject(new ApiError(httpStatus.BAD_REQUEST, "Data not found"));
      }

      resolve(data);
    });
  });
};
