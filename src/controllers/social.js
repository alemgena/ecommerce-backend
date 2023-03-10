const { social, token } = require("../services");
const axios = require("axios");
const config = require("../config/config");
const httpStatus = require("http-status");
const SuccessResponse = require("../utils/successResponse");
const catchAsync = require("../utils/catchAsync");

exports.google = catchAsync(async (req, res) => {
  const { access_token } = req.query;
  const user = await social.google(access_token);
  const tokens = await token.generateAuthTokens(user);
  res
    .status(httpStatus.OK)
    .send(new SuccessResponse(httpStatus.OK, "", { user, tokens }));
});
