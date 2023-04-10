const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");

const feedBackSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      minlength: 4,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
);

feedBackSchema.plugin(paginate);
feedBackSchema.plugin(toJSON);

module.exports = feedBack = mongoose.model("feedBack", feedBackSchema);
