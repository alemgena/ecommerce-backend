const httpStatus = require("http-status");
const { Product, ProductVariant } = require("../models");
const ApiError = require("../utils/ApiError");

exports.add = async (userID, pID, body) => {
  return new Promise((resolve, reject) => {
    Product.findOne({ seller: userID, _id: pID }, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(httpStatus.BAD_REQUEST, "Error finding the product", err)
        );
      }
      if (!data) {
        return reject(
          new ApiError(httpStatus.BAD_REQUEST, "Product not found")
        );
      }

      ProductVariant.create(
        { product: pID, options: body.options },
        (err, data) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.BAD_REQUEST,
                "Error adding product variant",
                err
              )
            );
          }

          resolve(
            data.populate({
              path: "options.option",
              select: "name",
              match: { deletedAt: { $eq: null } },
            })
          );
        }
      );
    });
  });
};

exports.delete = async (userID, variantID) => {
  return new Promise((resolve, reject) => {
    ProductVariant.findOne({
      _id: variantID,
    })
      .populate("product")
      .exec(async (err, data) => {
        if (err) {
          reject(
            new ApiError(
              httpStatus.BAD_REQUEST,
              "error finding the variant",
              err
            )
          );
        }
        if (!data) {
          return reject(
            new ApiError(httpStatus.BAD_REQUEST, "Variant not found")
          );
        }
        if (data.product.seller != userID) {
          return reject(
            new ApiError(
              httpStatus.UNAUTHORIZED,
              "Not authorized to delete the variant"
            )
          );
        }
        await data.delete();
        resolve(
          data.populate({
            path: "options.option",
            select: "name",
            match: { deletedAt: { $eq: null } },
          })
        );
      });
  });
};

exports.update = async (userID, variantID, body) => {
  return new Promise((resolve, reject) => {
    ProductVariant.findOne({
      _id: variantID,
    })
      .populate("product")
      .exec(async (err, data) => {
        if (err) {
          reject(
            new ApiError(
              httpStatus.BAD_REQUEST,
              "error finding the variant",
              err
            )
          );
        }
        if (!data) {
          return reject(
            new ApiError(httpStatus.BAD_REQUEST, "Variant not found")
          );
        }
        if (data.product.seller != userID) {
          return reject(
            new ApiError(
              httpStatus.UNAUTHORIZED,
              "Not authorized to update the variant"
            )
          );
        }
        data.options = body;
        await data.save();
        resolve(
          data.populate({
            path: "options.option",
            select: "name",
            match: { deletedAt: { $eq: null } },
          })
        );
      });
  });
};
