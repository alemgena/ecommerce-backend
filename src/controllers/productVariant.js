const httpStatus = require("http-status");
const { productVariant } = require("../services");
const catchAsync = require("../utils/catchAsync");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  const data = await productVariant.add(req.user.id, req.params.id, req.body);
  res
    .status(httpStatus.CREATED)
    .send(
      new SuccessResponse(
        httpStatus.CREATED,
        "You have successfully created a new variant for your product",
        data
      )
    );
});

exports.delete = catchAsync(async (req, res) => {
  const data = await productVariant.delete(req.user.id, req.params.id);
  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "You have successfully deleted the product variant",
        data
      )
    );
});

exports.update = catchAsync(async (req, res) => {
  const data = await productVariant.update(
    req.user.id,
    req.params.id,
    req.body
  );
  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "You have successfully updated the product variant",
        data
      )
    );
});
