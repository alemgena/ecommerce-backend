const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
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

subCategorySchema.statics.isNameTaken = async function (
  name,
  excludeSubCategoryId
) {
  const data = await this.findOne({ name, _id: { $ne: excludeSubCategoryId } });
  return !!data;
};
subCategorySchema.virtual("product", {
  ref: "Product",
  localField: "_id",
  foreignField: "subCategory",
  match: { state: "ACTIVE" },
});

subCategorySchema.virtual("options", {
  ref: "ProductOption",
  localField: "_id",
  foreignField: "subcategory",
  match: { deleted: false },
  autopopulate: true,
});
subCategorySchema.plugin(require(`mongoose-autopopulate`));
subCategorySchema.plugin(mongooseLeanVirtuals);
subCategorySchema.set("toJSON", { virtuals: true });
subCategorySchema.set("toObject", { virtuals: true });
subCategorySchema.plugin(paginate);
subCategorySchema.plugin(toJSON);

module.exports = Subcategory = mongoose.model("Subcategory", subCategorySchema);
