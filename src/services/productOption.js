const httpStatus = require("http-status");
const { ProductOption, Subcategory } = require("../models");
const ApiError = require("../utils/ApiError");

exports.add = async (sID, body) => {
  return new Promise((resolve, reject) => {
    Subcategory.findOne({ _id: sID }, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(
            httpStatus.BAD_REQUEST,
            "Error finding the sub category",
            err
          )
        );
      }
      if (!data) {
        return reject(
          new ApiError(httpStatus.BAD_REQUEST, "Sub category not found")
        );
      }

      const options = body.map((option) => ({
        subcategory: data.id,
        name: option.name,
        input_type: option.input_type,
      }));

      ProductOption.insertMany(options, (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.BAD_REQUEST,
              "Error adding product option",
              err
            )
          );
        }

        resolve(data);
      });
    });
  });
};

exports.delete = async (oID) => {
  return new Promise((resolve, reject) => {
    ProductOption.findOne({
      _id: oID,
    }).exec(async (err, data) => {
      if (err) {
        reject(
          new ApiError(httpStatus.BAD_REQUEST, "error finding the option", err)
        );
      }
      if (!data) {
        return reject(new ApiError(httpStatus.BAD_REQUEST, "Option not found"));
      }
      await data.delete();
      resolve(data);
    });
  });
};

exports.update = async (optionID, body) => {
  return new Promise((resolve, reject) => {
    ProductOption.findOne({
      _id: optionID,
    }).exec(async (err, data) => {
      if (err) {
        reject(
          new ApiError(httpStatus.BAD_REQUEST, "error finding the option", err)
        );
      }
      if (!data) {
        return reject(
          new ApiError(httpStatus.BAD_REQUEST, "Subcategory option not found")
        );
      }
      Object.assign(data, body);
      await data.save();
      resolve(data);
    });
  });
};

exports.get = (id) => {
  return new Promise((resolve, reject) => {
    ProductOption.findOne({
      _id: id,
    }).exec(async (err, data) => {
      if (err) {
        reject(
          new ApiError(httpStatus.BAD_REQUEST, "error finding the option", err)
        );
      }
      if (!data) {
        return reject(
          new ApiError(httpStatus.BAD_REQUEST, "Subcategory option not found")
        );
      }

      resolve(data);
    });
  });
};

exports.AddSubOption = async (poID, body) => {
  return new Promise((resolve, reject) => {
    ProductOption.findOne({ _id: poID }, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(
            httpStatus.BAD_REQUEST,
            "Error finding the product option",
            err
          )
        );
      }
      if (!data) {
        return reject(
          new ApiError(httpStatus.BAD_REQUEST, "Product option not found")
        );
      }
      ProductOption.findOne(
        { ...body, parentOption: data.id },
        (err, duplicated) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.BAD_REQUEST,
                "Error adding sub option",
                err
              )
            );
          }
          if (duplicated) {
            return reject(
              new ApiError(httpStatus.BAD_REQUEST, "Sub option already exists")
            );
          }

          ProductOption.create(
            { ...body, parentOption: data.id },
            (err, data) => {
              if (err) {
                return reject(
                  new ApiError(
                    httpStatus.BAD_REQUEST,
                    "Error adding sub option",
                    err
                  )
                );
              }

              resolve(data);
            }
          );
        }
      );
    });
  });
};
