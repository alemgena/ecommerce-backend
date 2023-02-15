const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");
const Double = require("@mongoosejs/double");

const faqSchema = mongoose.Schema(
    {

        question: {
            type: String,
            required: true,
            minlength: 3,
            trim: true,
        },
        answer: {
            type: String,
            required: true,
            minlength: 3,
            trim: true,
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


faqSchema.plugin(toJSON);
faqSchema.plugin(paginate);

module.exports = Faq = mongoose.model("Faq", faqSchema);
