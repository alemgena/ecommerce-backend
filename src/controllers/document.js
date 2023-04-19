const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { document } = require("../services");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  const result = await document.add({ ...req.body });
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", result));
});

exports.delete = catchAsync(async (req, res) => {
  const result = await document.delete(req.params.id);

  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "Successfully deleted the document",
        result
      )
    );
});

exports.update = catchAsync(async (req, res) => {
  const original = await document.get(req.params.id);
  const result = await document.update(req.params.id, req.body);
  res.send(
    new SuccessResponse(httpStatus.OK, "successfully updated the document", {
      original: original,
      edited: result,
    })
  );
});
exports.get = catchAsync(async (req, res) => {
  const data = await document.get(req.params.id);
  res.send(new SuccessResponse(httpStatus.OK, " ", data));
});
exports.list = catchAsync(async (req, res) => {
  const data = await document.list();
  res.send(new SuccessResponse(httpStatus.OK, " ", data));
});
