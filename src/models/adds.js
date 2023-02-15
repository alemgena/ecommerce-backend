const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const addsSchema = new mongoose.Schema(
  {
    imageUri: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
addsSchema.plugin(toJSON);
addsSchema.plugin(paginate);
module.exports = Adds = mongoose.model("Adds", addsSchema);
