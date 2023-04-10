const httpStatus = require("http-status");
const { productOption } = require("../services");
const catchAsync = require("../utils/catchAsync");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  const data = await productOption.add(req.params.id, req.body);
  res
    .status(httpStatus.CREATED)
    .send(
      new SuccessResponse(
        httpStatus.CREATED,
        "Option successfully created",
        data
      )
    );
});

exports.addSubOption = catchAsync(async (req, res) => {
  const data = await productOption.AddSubOption(req.params.id, req.body);
  res
    .status(httpStatus.CREATED)
    .send(
      new SuccessResponse(
        httpStatus.CREATED,
        "Sub option successfully created",
        data
      )
    );
});

exports.delete = catchAsync(async (req, res) => {
  const data = await productOption.delete(req.params.id);
  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "You have successfully deleted the subcategory option",
        data
      )
    );
});

exports.update = catchAsync(async (req, res) => {
  const original = await productOption.get(req.params.id);
  const data = await productOption.update(req.params.id, req.body);
  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "You have successfully updated the subcategory option",
        { original: original, edited: data }
      )
    );
});
