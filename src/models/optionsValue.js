const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const mongoose_delete = require("mongoose-delete");

const optionValue = new mongoose.Schema(
  {
    option: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductOption",
      required: true,
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OptionValue",
      autopopulate: { maxDepth: 1 },
    },
    value: { type: String, required: true, trim: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

optionValue.plugin(toJSON);
optionValue.plugin(paginate);
optionValue.plugin(mongoose_delete, { overrideMethods: true });

const OptionValue = mongoose.model("OptionValue", optionValue);

// OptionValue.collection.createIndex(
//   { option: 1, value: 1 },
//   { unique: true, partialFilterExpression: { deleted: { $eq: false } } }
// );

module.exports = OptionValue;
