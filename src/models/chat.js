const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let fullDate = year + "-" + month + "-" + date;
const chatSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  url: {
    type: String,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: new Date(fullDate) },
});
chatSchema.plugin(toJSON);
chatSchema.plugin(paginate);
module.exports = Chat = mongoose.model("Chat", chatSchema);
