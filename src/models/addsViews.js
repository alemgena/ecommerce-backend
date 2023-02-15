const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const addsViewSchema = new mongoose.Schema({
  addsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Adds ",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User ",
    required: true,
  },
});
addsViewSchema.statics.isUserView = async function (userId) {
  const data = await this.findOne({ userId });
  return !!data;
};
addsViewSchema.plugin(toJSON);
addsViewSchema.plugin(paginate);
module.exports = AddsView = mongoose.model("AddsView", addsViewSchema);
