const mongoose = require("mongoose");
const validator = require("validator");
const { toJSON, paginate } = require("./plugins");

const notificationSchema = mongoose.Schema(
  {
    title: {
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
    body: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

notificationSchema.plugin(toJSON);
notificationSchema.plugin(paginate);
module.exports = Notification = mongoose.model("Notification", notificationSchema);
