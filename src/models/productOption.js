const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const mongoose_delete = require("mongoose-delete");

const productOption = new mongoose.Schema(
  {
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    input_type: {
      type: String,
      enum: ["check", "input"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentOption: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductOption",
    },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);
productOption.virtual("values", {
  ref: "OptionValue",
  localField: "_id",
  foreignField: "option",
  match: { deleted: false },
  autopopulate: { maxDepth: 1 },
});
productOption.plugin(require(`mongoose-autopopulate`));
productOption.plugin(mongooseLeanVirtuals);
productOption.set("toJSON", { virtuals: true });
productOption.set("toObject", { virtuals: true });
productOption.plugin(toJSON);
productOption.plugin(paginate);
productOption.plugin(mongoose_delete, { overrideMethods: true });
productOption
  .path("subcategory")
  .required(
    this.parentOption == "",
    "Sub category or parent option is required"
  );
productOption
  .path("parentOption")
  .required(
    this.subcategory == "",
    "Sub category or parent option is required"
  );

productOption.index({ name: 1, subcategory: 1 }, { unique: true });

const ProductOption = mongoose.model("ProductOption", productOption);
// ProductOption.collection.createIndex(
//   { subcategory: 1, name: 1 },
//   { unique: true, partialFilterExpression: { deleted: { $eq: false } } }
// );
module.exports = ProductOption;
