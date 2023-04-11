const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");
const mongoose_delete = require("mongoose-delete");
const regionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subCitys:{
        type:[String],
        required: true
     }
  },
);
regionSchema.index(
    { name: 1 },
    { unique: true, partialFilterExpression: { deleted: { $eq: false } } }
  );
  
  regionSchema.statics.isNameTaken = async function (
    name,
    Id
  ) {
    const data = await this.findOne({ name, _id: { $ne:Id } });
    return !!data;
  };
regionSchema.plugin(paginate);
regionSchema.plugin(toJSON);
regionSchema.plugin(mongoose_delete, { overrideMethods: true });

module.exports = region = mongoose.model("region", regionSchema);
