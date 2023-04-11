const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { region } = require("../services");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  const result = await region.add({ ...req.body });
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", result));
});

exports.delete = catchAsync(async (req, res) => {
  const result = await region.delete(req.params.id);

  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "Successfully deleted the region",
        result
      )
    );
});

exports.update = catchAsync(async (req, res) => {
  const original = await region.get(req.params.id);
  const result = await region.update(req.params.id, req.body);
  res.send(
    new SuccessResponse(httpStatus.OK, "successfully updated the region", {
      original: original,
      edited: result,
    })
  );
});
exports.get = catchAsync(async (req, res) => {
  const data = await region.get(req.params.id);
  res.send(new SuccessResponse(httpStatus.OK, " ", data));
});
exports.list = catchAsync(async (req, res) => {
  const data = await region.list();
  res.send(new SuccessResponse(httpStatus.OK, " ", data));
});
