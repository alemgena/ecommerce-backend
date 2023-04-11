const httpStatus = require("http-status");
const { valuesSubOptions } = require("../services");
const catchAsync = require("../utils/catchAsync");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  const data = await valuesSubOptions.add(req.params.id, req.body);
  res
    .status(httpStatus.CREATED)
    .send(
      new SuccessResponse(httpStatus.CREATED, "Data successfully created", data)
    );
});

exports.getSubOptions = catchAsync(async (req, res) => {
  const data = await valuesSubOptions.getSubOptions(
    req.params.id,
    req.params.option
  );
  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "You have successfully deleted the data",
        data
      )
    );
});
