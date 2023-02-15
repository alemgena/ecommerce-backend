const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { favourite } = require("../services");
const SuccessResponse = require("../utils/successResponse");
const ApiError = require("../utils/ApiError");
const ObjectID = require("mongodb").ObjectId;

exports.add = catchAsync(async (req, res) => {
  if (!ObjectID.isValid(req.body.product)) {
    throw new ApiError(httpStatus.NOT_FOUND, "data is  not valid");
  }
  console.log(req.user.id)
  const body = { user: req.user.id, ...req.body };
  const data = await favourite.add(body);
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", data));
});
exports.get = catchAsync(async (req, res) => {
  const data = await favourite.get(req.user.id);
  res.send(
    new SuccessResponse(
      httpStatus.OK,
      "",
      data
    )
  );
});