const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");
const Double = require("@mongoosejs/double");
const mongoose_delete = require("mongoose-delete");
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imagesURL: [
      {
        type: String,
        require:true
      },
    ],
    price: {
      type: Double,
      required: true,
      trim: true,
    },
    viewCount: {
      type: Number,
      required: false,
      trim: true,
    },
    region:{
    type: String,
    required: true,
    },
    location: {
        type: String,
      required: true,
        default:''
    },
    
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
      autopopulate: { maxDepth: 1 },
    },
    options: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductOption",
          required: true,
          autopopulate: { maxDepth: 1 },
        },
        values: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OptionValue",
            required: true,
            autopopulate: { maxDepth: 1 },
          },
        ],
        value: {
          type: String,
          trim: true,
        },
        others: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      autopopulate:true
    },
    otherOptions: {
      type: Object,
    },
    featured: {
      type: Boolean,
      default: true,
    },
    premium: {
      type: Boolean,
      default: false,
    },
    state: {
      type: String,
      default: "ACTIVE",
      enum: ["ACTIVE", "DRAFT", "DELETED", "SUSPENDED", "BLOCKED", "SOLD"],
    },
  },
  {
    timestamps: true,
    // collation: { locale: "en", strength: 2 },
  }
);

productSchema.plugin(require(`mongoose-autopopulate`));
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });
productSchema.plugin(mongoose_delete, { overrideMethods: true });
const Product = mongoose.model("Product", productSchema);
Product.collection.createIndex({ name: "text" });

module.exports = Product;
