const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const mongoose_delete = require("mongoose-delete");

const reviewSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate:true,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  review: {
    type: String,
    trim: true,
  },
});

reviewSchema.index(
  { seller: 1, buyer: 1, productId: 1 },
  { unique: true, partialFilterExpression: { deleted: { $eq: false } } }
);
reviewSchema.plugin(mongoose_delete, { overrideMethods: true });
reviewSchema.plugin(require(`mongoose-autopopulate`));
reviewSchema.plugin(toJSON);
reviewSchema.plugin(paginate);

module.exports = Review = mongoose.model("Review", reviewSchema);
