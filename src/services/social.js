const axios = require("axios");
const httpStatus = require("http-status");
const config = require("../config/config");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const auth = require("./auth");

exports.google = async (access_token) => {
  return axios
     .get(`${config.GOOGLE_USERINFO}${access_token}`)
    .then((response) => {
      return response.data;
    })
    .then(async (user) => {
      const data = await User.findOne({ email: user.email });
      if (data) {
        return data;
      }

      const payload = {
        first_name: user.given_name,
        last_name: user.family_name,
        email: user.email,
        isEmailVerified: user.verified_email,
        imageURL: user.picture,
        auth_type: "SOCIAL",
      };

      return await User.create(payload);
    })
    .catch((error) => {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error.response.data.error.code,
        error.response.data.error.status,
        error
      );
    });
};
