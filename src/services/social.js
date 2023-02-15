const { User } = require("../models");
const auth = require("./auth");
exports.google = async (user) => {
  const data = await User.findOne({ email: user.email });
  if (data) {
    return data;
  }

  const payload = {
    first_name: user.given_name,
    last_name: user.family_name,
    email: user.email,
    isEmailVerified: user.email_verified,
    imageURL: user.picture,
    auth_type: "SOCIAL",
  };

  return await auth.register(payload);
};
