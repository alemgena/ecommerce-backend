const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { chat } = require("../services");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
    const body = { from: req.user.id, ...req.body };
  const result = await chat.add(body );
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", result));
});
exports.get = catchAsync(async (req, res) => {
  const result = await chat.get(req.user.id);
  res.send(
    new SuccessResponse(
      httpStatus.OK,
      " ",
      result
    )
  );
});
exports.list = catchAsync(async (req, res) => {
    const result = await chat.list(req.user.id);
    res.send(
      new SuccessResponse(
        httpStatus.OK,
        " ",
        result
      )
    );
  });