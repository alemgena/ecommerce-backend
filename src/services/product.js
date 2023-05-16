const httpStatus = require("http-status");
const {
  Product,
  OptionValue,
  ProductOption,
  Subcategory,
} = require("../models");
const ApiError = require("../utils/ApiError");

exports.add = async (productData) => {
  // Check if the subcategory exists
  // return new Promise(async (resolve, reject) => {
  const subcategory = await Subcategory.findById(productData.subcategory);
  if (!subcategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Subcategory not found");
  }
  if (productData?.options && productData.options.length > 0) {
    // Check if the options exist
    const optionIds = productData.options
      .filter((option) => option.suboption === false)
      .map((option) => option.id);

    const options = await ProductOption.find({
      _id: { $in: optionIds },
      subcategory: productData.subcategory,
    });

    if (options.length !== optionIds.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "One or more options not found"
      );
    }

    // Check if the option values exist
    // poValuesID = productData.options.map((option) => option.values);
    for (const option of productData.options) {
      const optionValues = await OptionValue.find({
        _id: { $in: option.values },
        option: option.id,
      });
      if (option.values?.length) {
        if (optionValues.length !== option.values.length) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "One or more options values not found"
          );
        }
      }
    }
  }
  // Create the new product document
  const newProduct = new Product({
    ...productData,
    subcategory: subcategory._id,
    options: productData.options,
  });

  // Save the new product to the database
  await newProduct.save();
  return newProduct.populate();
};

exports.list = async () => {
  return Product.find({});
};

exports.view = async (id) => {
  const product = await Product.findOne({ _id: id });

  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, "product not found");
  }

  var subCategory = product.subcategory;
  const relatedProducts = await Product.find()
    .where("subcategory")
    .equals(subCategory);

  var response = { product, relatedProducts };

  var viewCount = product.viewCount;
  var newViewCount;
  if (viewCount) {
    newViewCount = viewCount + 1;
  } else {
    newViewCount = 1;
  }
  product.viewCount = newViewCount;
  product.save();

  return response;
};

exports.queryProducts = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  return products;
};

exports.update = async (id, productData) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "product not found");
  }
  let keys = Object.keys(productData);
  keys.map((x) => {
    product[x] = productData[x];
  });
  await product.save();
  return product;
};

exports.uploadProductImages = async (files, id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "product not found");
  }

  const images = files.map((type) => `images/${type.filename}`);

  product.imagesURL = images;
  return await product.save();
};
exports.updateProductImages = (productId, newImages) => {
  return new Promise((resolve, reject) => {
    const images = newImages?.map((type) => `images/${type.filename}`);
    Product.findByIdAndUpdate(
      productId,
      { $push: { imagesURL: { $each: images, $position: 0 } } },
      { new: true },
      (err, updatedProduct) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Unable to update product image",
              err
            )
          );
        }
        if (!updatedProduct) {
          return reject(
            new ApiError(httpStatus.NOT_FOUND, "Product  not found")
          );
        }
        resolve(updatedProduct);
      }
    );
  });
};
exports.delete = async (id) => {
  return new Promise((resolve, reject) => {
    Product.findById(id, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(
            httpStatus.NOT_FOUND,
            "Unable to find the  product",
            err
          )
        );
      }
      if (!data) {
        return reject(
          new ApiError(httpStatus.NOT_FOUND, "Product not found")
        );
      }
      await data.delete();
      resolve(data);
    });
  });
};
