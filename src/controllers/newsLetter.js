const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { newsLetter } = require("../services");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  const data = await newsLetter.add(req.user.id);
  res
    .status(httpStatus.CREATED)
    .send(
      new SuccessResponse(
        httpStatus.CREATED,
        "You have successfully subscribed to our newsletter",
        data
      )
    );
});
