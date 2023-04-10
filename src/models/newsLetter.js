const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const mongoose_delete = require("mongoose-delete");

const newsLetterSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

newsLetterSchema.index(
  { userID: 1 },
  { unique: true, partialFilterExpression: { deleted: { $eq: false } } }
);

newsLetterSchema.plugin(toJSON);
newsLetterSchema.plugin(paginate);
newsLetterSchema.plugin(mongoose_delete, { overrideMethods: true });

module.exports = Category = mongoose.model("NewsLetter", newsLetterSchema);
