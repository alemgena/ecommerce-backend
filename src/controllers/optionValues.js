const httpStatus = require("http-status");
const { optionValues } = require("../services");
const catchAsync = require("../utils/catchAsync");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  const data = await optionValues.add(req.params.id, req.body);
  res
    .status(httpStatus.CREATED)
    .send(
      new SuccessResponse(httpStatus.CREATED, "Data successfully created", data)
    );
});

exports.delete = catchAsync(async (req, res) => {
  const data = await optionValues.delete(req.params.id);
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

exports.update = catchAsync(async (req, res) => {
  const original = await optionValues.get(req.params.id);
  const data = await optionValues.update(req.params.id, req.body);
  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "You have successfully updated the data",
        { original: original, edited: data }
      )
    );
});
