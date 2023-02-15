const mongoose = require("mongoose");
const validator = require("validator");
const { toJSON, paginate } = require("./plugins");

const houseAdvertisement = mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    duration: {
      type: Date,
      require:true
    },
    status: {
      type: String,
      default: "ACTIVE",
      enum: ["ACTIVE", "BLOCKED",]
    },
  },
  {
    timestamps: true,
  }
);

houseAdvertisement.plugin(toJSON);
houseAdvertisement.plugin(paginate);
module.exports = HouseAdvertisement = mongoose.model("HouseAdvertisement", houseAdvertisement);
