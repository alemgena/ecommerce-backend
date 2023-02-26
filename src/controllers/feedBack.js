const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { feedBack } = require("../services");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  const data = await feedBack.add({ ...req.body, userId: req.user._id });
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", data));
});

exports.list = catchAsync(async (req, res) => {
  const data = await feedBack.list();
  res.status(httpStatus.OK).send(new SuccessResponse(httpStatus.OK, "", data));
});
