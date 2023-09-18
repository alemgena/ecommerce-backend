const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const { toJSON, paginate } = require("./plugins");
const chatSchema = new mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);
chatSchema.plugin(toJSON);
chatSchema.plugin(paginate);
chatSchema.plugin(require(`mongoose-autopopulate`));
chatSchema.plugin(mongoose_delete, { overrideMethods: true });
module.exports = Chat = mongoose.model("Chat", chatSchema);
