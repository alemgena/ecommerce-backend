const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { chat } = require("../services");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  console.log("rrr",req.body)
    const body = { from:'63e343195c535724894efa5b', ...req.body };
  const result = await chat.add(body );
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", result));
});
exports.get = catchAsync(async (req, res) => {
  const result = await chat.get("63e343195c535724894efa5b");
  res.send(
    new SuccessResponse(
      httpStatus.OK,
      " ",
      result
    )
  );
});
exports.getByProduct = catchAsync(async (req, res) => {
  const result = await chat.getByProduct(req.params.id);
  res.send(
    new SuccessResponse(
      httpStatus.OK,
      " ",
      result
    )
  );
});
exports.getByRoomId = catchAsync(async (req, res) => {
  const result = await chat.getByRoomId(req.params.roomId);
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