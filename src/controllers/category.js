const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { category } = require("../services");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  const data = await category.add({ ...req.body });
  res
    .status(httpStatus.CREATED)
    .send(
      new SuccessResponse(
        httpStatus.CREATED,
        "Category successfully created",
        data
      )
    );
});

exports.list = catchAsync(async (req, res) => {
  const data = await category.list();
  res.status(httpStatus.OK).send(new SuccessResponse(httpStatus.OK, "", data));
});

exports.update = catchAsync(async (req, res) => {
  const original = await category.get(req.params.id);
  const udatedCategory = await category.update(req.params.id, req.body);
  res.status(httpStatus.OK).send(
    new SuccessResponse(httpStatus.OK, "", {
      original: original,
      edited: udatedCategory,
    })
  );
});

exports.delete = catchAsync(async (req, res) => {
  const deletedCategory = await category.delete(req.params.id);
  res
    .status(httpStatus.OK)
    .send(new SuccessResponse(httpStatus.OK, "", deletedCategory));
});

exports.listSubCategories = catchAsync(async (req, res) => {
  const subCategories = await category.listSubCategories(req.params.id);
  res
    .status(httpStatus.OK)
    .send(new SuccessResponse(httpStatus.OK, "", subCategories));
});
