const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { favourite } = require("../services");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  console.log(req.body);
  const data = await favourite.add({ user: req.user.id, ...req.body });
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", data));
});
exports.get = catchAsync(async (req, res) => {
  const data = await favourite.get(req.user.id);
  res.send(new SuccessResponse(httpStatus.OK, "", data));
});
exports.delete = catchAsync(async (req, res) => {
  const data = await favourite.delete(req.params.id);
  res.send(new SuccessResponse(httpStatus.OK, "Successfully removed the product from favorite", data));
});