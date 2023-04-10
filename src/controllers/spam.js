const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { spam } = require("../services");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  const data = await spam.add(req.body);
  res
    .status(httpStatus.CREATED)
    .send(
      new SuccessResponse(httpStatus.CREATED, "Added to the spam list", data)
    );
});
