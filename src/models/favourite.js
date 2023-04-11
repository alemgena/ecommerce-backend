const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");
const Double = require("@mongoosejs/double");

const favouritesSchema = mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        state: {
            type: String,
            default: "ACTIVE",
            enum: ["ACTIVE", "INACTIVE"],
        },
    },
    {
        timestamps: true,
    }
);


favouritesSchema.plugin(toJSON);
favouritesSchema.plugin(paginate);

module.exports = Favourite = mongoose.model("Favourite", favouritesSchema);
