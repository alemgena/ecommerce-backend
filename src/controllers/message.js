const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { message } = require("../services");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  console.log("rrr",req.body)
    const body = { sender:req.user.id, ...req.body };
  const result = await message.add(body );
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", result));
});
exports.get = catchAsync(async (req, res) => {
    const result = await message.get(req.params.chatId );
    res
      .status(httpStatus.CREATED)
      .send(new SuccessResponse(httpStatus.CREATED, "", result));
  });
  exports.delete = catchAsync(async (req, res) => {
    const result = await message.delete(req.params.id);
    res.send(
      new SuccessResponse(
        httpStatus.OK,
        " ",
        result
      )
    );
  });