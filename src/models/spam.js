const mongoose = require("mongoose");
const validator = require("validator");
const { toJSON, paginate } = require("./plugins");

const spamSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  
  },
  {
    timestamps: true,
  }
);

spamSchema.plugin(toJSON);
spamSchema.plugin(paginate);
module.exports = Category = mongoose.model("Spam", spamSchema);
