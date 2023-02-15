const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { adds } = require("../services");
const SuccessResponse = require("../utils/successResponse");
exports.add = catchAsync(async (req, res) => {
  const data = await adds.add({ ...req.body });
  res
    .status(httpStatus.CREATED)
    .send(
      new SuccessResponse(httpStatus.CREATED, "Add successfully added", data)
    );
});
