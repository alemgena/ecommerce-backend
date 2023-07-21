const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Review, Chat, Product } = require("../models");
const { default: mongoose } = require("mongoose");

exports.add = async (body) => {
  return new Promise(async (resolve, reject) => {
    const { buyerId, productId, rating, review } = body;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return reject(new ApiError(httpStatus.NOT_FOUND, "Product not found"));
    }

    // const chat = await Chat.findOne({
    //   from: buyerId,
    //   to: product.seller._id,
    //   product: productId,
    // });

    // if (!chat) {
    //   return reject(
    //     new ApiError(
    //       httpStatus.NOT_FOUND,
    //       "No chat found between buyer and seller for the specified product"
    //     )
    //   );
    // }
    // Check if the user has already given a review for the specified product
    const existingReview = await Review.findOne({
      buyer: buyerId,
      seller: product.seller._id,
      productId: productId,
    });

    if (existingReview) {
      return reject(
        new ApiError(
          httpStatus.MULTIPLE_CHOICES,
          "You have already given a review for this product"
        )
      );
    }

    // Create a new review and save it to the database
    const newReview = new Review({
      buyer: buyerId,
      seller: product.seller._id,
      productId: productId,
      rating: rating,
      review: review,
    });

    resolve(await newReview.save());
  });
};

exports.update = async (id, updateBody) => {
  return new Promise((resolve, reject) => {
    Review.findOne({ id }, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(httpStatus.NOT_FOUND, "Error finding the data", err)
        );
      }
      if (!data) {
        return reject(new ApiError(httpStatus.NOT_FOUND, "Data not found"));
      }
      Object.assign(data, updateBody);
      await data.save();
      resolve(data);
    });
  });
};
exports.view = async (id) => {
  return new Promise((resolve, reject) => {
    Review.findById(id, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(httpStatus.NOT_FOUND, "Error finding the data", err)
        );
      }
      if (!data) {
        return reject(new ApiError(httpStatus.NOT_FOUND, "Data not found"));
      }
      resolve(data);
    });
  });
};

exports.query = async (filter, options) => {
  const review = await Review.paginate(filter, options);
  return review;
};

exports.delete = async (id) => {
  return new Promise((resolve, reject) => {
    Review.findOne({ id }).exec(async (err, data) => {
      if (err) {
        reject(
          new ApiError(httpStatus.BAD_REQUEST, "error finding the data", err)
        );
      }
      if (!data) {
        return reject(new ApiError(httpStatus.BAD_REQUEST, "Data not found"));
      }
      await data.delete();
      resolve(data);
    });
  });
};
//getAvarge
exports.getAvarge = async (productId) => {
  return new Promise(async(resolve, reject) => {
    const product = await Review.findOne({ productId:productId });
    if (!product) {
      return reject(new ApiError(httpStatus.NOT_FOUND, "Product not found"));
    }
    Review.aggregate([
      { $unwind: "$rating" },
      { $match: { productId:mongoose.Types.ObjectId(productId)} },
      { $group: { _id: null, averageRating: { $avg: '$rating' } } }
    ])
      .exec((error, averageRating) => {
        if (error) {
          reject(error);
        } else {
          resolve(averageRating[0]?.averageRating||0);
        }
      });
    })
};