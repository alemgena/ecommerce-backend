const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { auth, token } = require("../services");
const SuccessResponse = require("../utils/successResponse");

exports.register = catchAsync(async (req, res) => {
  const user = await auth.register({ ...req.body });
  const tokens = await token.generateAuthTokens(user);
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", { user, tokens }));
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await auth.loginUserWithEmailAndPassword(email, password);
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
