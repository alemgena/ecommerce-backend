const catchAsync = require("../utils/catchAsync");
const ObjectID = require("mongodb").ObjectId;
const SuccessResponse = require("../utils/successResponse");
const ApiError = require("../utils/ApiError");
const { user } = require("../services");
const httpStatus = require("http-status");

exports.changeUserPassword = catchAsync(async (req, res) => {
  const id = req.user.id;
  const data = await user.changePassword(id, req.body);
  res.status(httpStatus.OK).send(new SuccessResponse(httpStatus.OK, "", data));
});
exports.activateUserAccount = catchAsync(async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Id is not valid");
  }
  const data = await user.activateAccount(req.params.id);
  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "You have Activate User Account successfully.",
        data
      )
    );
});

exports.suspendUserAccount = catchAsync(async (req, res) => {
  const data = await user.suspendAccount(req.params.id);
  res
    .status(httpStatus.OK)
    .send(new SuccessResponse(httpStatus.OK, "Account suspended", data));
});

exports.update = catchAsync(async (req, res) => {
  const original = await user.get(req.params.id);
  const data = await user.update(req.params.id, req.body);

  res.status(httpStatus.OK).send(
    new SuccessResponse(httpStatus.OK, "", {
      original: original,
      edited: data,
    })
  );
});

exports.get = catchAsync(async (req, res) => {
  const data = await user.get(req.params.id);
  res.status(httpStatus.OK).send(new SuccessResponse(httpStatus.OK, "", data));
});

exports.list = catchAsync(async (req, res) => {
  const data = await user.list();
  res.status(httpStatus.OK).send(new SuccessResponse(httpStatus.OK, "", data));
});
