const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { newsLetter } = require("../services");
const SuccessResponse = require("../utils/successResponse");
const pick = require("../utils/pick");

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

exports.list = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["filters", "search"]);
  const options = pick(req.query, [
    "sortBy",
    "limit",
    "page",
    "paginate",
    "populate",
  ]);
  const data = await newsLetter.query(filter, options);
  res
    .status(httpStatus.OK)
    .send(new SuccessResponse(httpStatus.OK, "", data.results, data.metaData));
});

exports.unsubscribe = catchAsync(async (req, res) => {
  const data = await newsLetter.unsubscribe(req.user._id);
  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "You have successfully unsubscribed from our newsletter",
        data
      )
    );
});
exports.systemUnsubscribe = catchAsync(async (req, res) => {
  console.log(req.params.id);
  const data = await newsLetter.systemUnsubscribe(req.params.id);
  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "User successfully unsubscribed from our newsletter",
        data
      )
    );
});
