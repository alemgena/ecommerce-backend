const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");
const Double = require("@mongoosejs/double");
const mongoose_delete = require("mongoose-delete");
const shopSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    address: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
      },
      link: {
        type: String,
        required: true,
      },
      phone_number:{
       type:String,
       require:true
      },
    logo: {
      type: String,
   required: true,
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
  },
  {
    timestamps: true,
  }
);
shopSchema.index(
    { name: "text", description: "text" },
    { collation: { locale: "en", strength: 2 } }
  );
  
  shopSchema.index(
    { name: 1 },
    { unique: true, partialFilterExpression: { deleted: { $eq: false } } }
  );
  
  shopSchema.statics.isNameTaken = async function (
    name,
    Id
  ) {
    const data = await this.findOne({ name, _id: { $ne:Id } });
    return !!data;
  };
shopSchema.plugin(toJSON);
shopSchema.plugin(paginate);
shopSchema.plugin(mongoose_delete, { overrideMethods: true });
const Shop = mongoose.model("Shop", shopSchema)
module.exports = Shop;
