const httpStatus = require("http-status");
const { Category } = require("../models");
const ApiError = require("../utils/ApiError");
exports.add = async (categoryBody) => {
  return Category.create(categoryBody);
};

exports.list = async () => {
  return Category.find({});
};

exports.update = async (id, updateBody) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "sub category not found");
  }

  if (updateBody.name && (await Category.isNameTaken(updateBody.name, id))) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "category with this name already exist"
    );
  }

  Object.assign(category, updateBody);
  await category.save();
  return category;
};

exports.delete = async (id) => {
  return new Promise((resolve, reject) => {
    Category.findById(id, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(httpStatus.NOT_FOUND, "Unable to find the category", err)
        );
      }
      if (!data) {
        return reject(new ApiError(httpStatus.NOT_FOUND, "category not found"));
      }
      data.deletedAt = Date.now();
      await data.save();
      resolve(data);
    });
  });
};
exports.listSubCategories = async (id) => {
  return await subCategory.find(
    { category: id, deletedAt: null },
    { category: 0, deletedAt: 0 }
  );
};

exports.get = async (id) => {
  return new Promise((resolve, reject) => {
    Category.findById(id, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(httpStatus.NOT_FOUND, "Unable to find the category", err)
        );
      }
      if (!data) {
        return reject(new ApiError(httpStatus.NOT_FOUND, "category not found"));
      }
      resolve(data);
    });
  });
};
