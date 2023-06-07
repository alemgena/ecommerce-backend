const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const mongoose_delete = require("mongoose-delete");
const documentSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    trim: true,
    required: true,
  },
});
documentSchema.plugin(toJSON);
documentSchema.plugin(paginate);
documentSchema.plugin(mongoose_delete, { overrideMethods: true });
module.exports = Documents = mongoose.model("document", documentSchema);
