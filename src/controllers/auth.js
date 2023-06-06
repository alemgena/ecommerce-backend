const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { auth, token } = require("../services");
const SuccessResponse = require("../utils/successResponse");
const moment = require("moment");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

exports.register = catchAsync(async (req, res) => {
  const user = await auth.register({ ...req.body });
  const tokens = await token.generateAuthTokens(user);
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", { user, tokens }));
});
exports.login = catchAsync(async (req, res) => {
  const { input, password } = req.body;
  const user = await auth.loginUserWithEmailAndPassword(input, password);
  const tokens = await token.generateAuthTokens(user);
  res
    .status(httpStatus.OK)
    .send(new SuccessResponse(httpStatus.OK, "", { user, tokens }));
});

exports.emailVerification = catchAsync(async (req, res) => {
  const { email, code } = req.body;
  const user = await auth.emailVerify(email, code);
  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(httpStatus.OK, "Email successfully verified", user)
    );
});

exports.userForgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await auth.forgetPassword(email);
  res
    .status(httpStatus.OK)
    .send(new SuccessResponse(httpStatus.OK, "", result));
});
exports.refreshToken=catchAsync(async(req,res)=>{
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  ); 
 auth.verifyRefreshToken(req.body.refreshToken)
  .then(({ tokenDetails }) => {
    console.log(tokenDetails)
      const payload = {
        sub: tokenDetails.sub,
        iat: moment().unix(),
        exp: accessTokenExpires.unix(),
        
      };
      const accessToken = jwt.sign(
          payload, config.jwt.secret
      );
      res
      .status(httpStatus.OK)
      .send(new SuccessResponse(httpStatus.OK, "Access token created successfully",accessToken));
  })
  .catch(function (error) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "error refresh token",
      error
    );
  });
})