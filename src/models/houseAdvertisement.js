
const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");
const Double = require("@mongoosejs/double");
const mongoose_delete = require("mongoose-delete");
const houseAdvertisement = mongoose.Schema(
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
      link: {
        type: String,
        required: true,
      },
    photo: {
      type: String,
   required: true,
    },
  },
  {
    timestamps: true,
  }
);
houseAdvertisement.index(
    { title: "text", description: "text" },
    { collation: { locale: "en", strength: 2 } }
  );
houseAdvertisement.plugin(toJSON);
houseAdvertisement.plugin(paginate);
houseAdvertisement.plugin(mongoose_delete, { overrideMethods: true });
const HouseAdvertisement = mongoose.model("HouseAdvertisement", houseAdvertisement)
module.exports = HouseAdvertisement;
