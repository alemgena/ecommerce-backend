const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const mongoose_delete = require("mongoose-delete");
const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);
messageSchema.plugin(require(`mongoose-autopopulate`));
messageSchema.plugin(mongoose_delete, { overrideMethods: true });
module.exports = Message = mongoose.model("Message", messageSchema);
