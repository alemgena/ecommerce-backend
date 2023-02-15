const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

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
  { userId: 1 },
  { unique: true, partialFilterExpression: { deletedAt: { $eq: null } } }
);

newsLetterSchema.plugin(toJSON);
newsLetterSchema.plugin(paginate);
module.exports = Category = mongoose.model("NewsLetter", newsLetterSchema);
