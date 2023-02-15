const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const mongoose_delete = require("mongoose-delete");
const productVariant = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    options: [
      {
        option: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "ProductOption",
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

productVariant.index(
  { name: 1 },
  { unique: true, partialFilterExpression: { deleted: { $eq: null } } }
);

productVariant.plugin(toJSON);
productVariant.plugin(paginate);
productVariant.plugin(mongoose_delete, { overrideMethods: true });
module.exports = ProductVariant = mongoose.model(
  "ProductVariant",
  productVariant
);
