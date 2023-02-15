const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    profile_picture: {
      type: String,
      trim: true,
    },
    auth_type: {
      type: String,
      enum: ["SOCIAL", "EMAIL"],
      default: "EMAIL",
    },
    allergies: [
      {
        type: String,
        trim: true,
      },
    ],
    code:{
      type:String
      },
    status: {
      type: String,
      default: "ACTIVE",
      enum: ["ACTIVE", "DRAFT", "DELETED", "SUSPENDED", "BLOCKED"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    imageURL: [
      {
        type: String,
      },
    ],
    password: {
      type: String,
      // required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the toJSON plugin
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 14);
  }
  next();
});

module.exports = User = mongoose.model("User", userSchema);
