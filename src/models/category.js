const mongoose = require("mongoose");
const validator = require("validator");
const { toJSON, paginate } = require("./plugins");
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongoose_delete = require("mongoose-delete");
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageURL: {
      type: String,
      required: false,
      trim: true,
    },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);


categorySchema.index(
  { name: "text", description: "text" },
  { collation: { locale: "en", strength: 2 } }
);

categorySchema.index(
  { name: 1 },
  { unique: true, partialFilterExpression: { deleted: { $eq: false } } }
);
categorySchema.statics.isNameTaken = async function (
  name,
  excludecategoryId
) {
  const data = await this.findOne({ name, _id: { $ne: excludecategoryId } });
  return !!data;
};
categorySchema.virtual('subcategory', {
  ref: 'Subcategory',
  localField: '_id',
  foreignField: 'category',
  match: { deletedAt: null }
});
categorySchema.plugin(mongooseLeanVirtuals);
categorySchema.set('toJSON', { virtuals: true });
categorySchema.set('toObject', { virtuals: true });
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);
categorySchema.plugin(mongoose_delete, { overrideMethods: true });
module.exports = Category = mongoose.model("Category", categorySchema);
