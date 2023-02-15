const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ObjectID = require("mongodb").ObjectId;
const { addsView } = require("../services");
const SuccessResponse = require("../utils/successResponse");
const ApiError = require("../utils/ApiError");
exports.add = catchAsync(async (req, res) => {
  if (
    !(ObjectID.isValid(req.body.addsId) && ObjectID.isValid(req.body.userId))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, " data is not valid");
  }
  const data = await addsView.add({ ...req.body });
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", data));
});
exports.countAddsView = catchAsync(async (req, res) => {
  if (!ObjectID.isValid(req.params.addsId)) {
    throw new ApiError(httpStatus.NOT_FOUND, " Id is not valid");
  }
  const data = await addsView.countViews(req.params.addsId);
  res
    .status(httpStatus.OK)
    .send(new SuccessResponse(httpStatus.CREATED, "", data));
});
