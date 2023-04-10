const mongoose = require("mongoose");
const validator = require("validator");
const { toJSON, paginate } = require("./plugins");

const activityLogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ip: {
      type: String,
      required: true,
      trim: true,
    },
    action: {
      type: String,
      required: true,
      trim: true,
    },
    resource: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    EventData: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

activityLogSchema.plugin(toJSON);
activityLogSchema.plugin(paginate);
module.exports = Category = mongoose.model("ActivityLog", activityLogSchema);
