const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { feedBack } = require("../services");
const ObjectID = require("mongodb").ObjectId;
const SuccessResponse = require("../utils/successResponse");
const ApiError = require("../utils/ApiError");

exports.add = catchAsync(async (req, res) => {
  if (!ObjectID.isValid(req.body.userId)) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Id is not valid");
  }
  const data = await feedBack.add(req.body);
  res
    .status(httpStatus.OK)
    .send(new SuccessResponse(httpStatus.CREATED, "", data));
});

exports.list = catchAsync(async (req, res) => {
  const data = await feedBack.list();
  res.status(httpStatus.OK).send(new SuccessResponse(httpStatus.OK, "", data));
});
