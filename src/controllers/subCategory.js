const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { subCategory } = require("../services");
const SuccessResponse = require("../utils/successResponse");
const { date } = require("joi");

exports.add = catchAsync(async (req, res) => {
  const result = await subCategory.add({ ...req.body });
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", result));
});

exports.delete = catchAsync(async (req, res) => {
  const result = await subCategory.delete(req.params.id);

  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "Successfully deleted the sub category",
        result
      )
    );
});

exports.update = catchAsync(async (req, res) => {
  const original = await subCategory.get(req.params.id);
  const result = await subCategory.update(req.params.id, req.body);
  res.send(
    new SuccessResponse(
      httpStatus.OK,
      "successfully updated the sub category",
      { original: original, edited: result }
    )
  );
});
exports.get = catchAsync(async (req, res) => {
  const result = await subCategory.get(req.params.id);
  res.send(
    new SuccessResponse(
      httpStatus.OK,
      " ",
      result

    )
  );
});