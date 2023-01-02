const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    deletedAt: { type: Date, default: null },
    imageURL: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

subCategorySchema.index(
  { name: "text", description: "text" },
  { collation: { locale: "en", strength: 2 } }
);

subCategorySchema.index(
  { name: 1 },
  { unique: true, partialFilterExpression: { deletedAt: { $eq: null } } }
);

subCategorySchema.plugin(paginate);
subCategorySchema.plugin(toJSON);

module.exports = Subcategory = mongoose.model("Subcategory", subCategorySchema);