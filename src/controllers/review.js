const httpStatus = require("http-status");
const { review } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  const result = await review.add({ ...req.body, buyerId: req.user._id });
  return res
    .status(httpStatus.CREATED)
    .json(
      new SuccessResponse(
        httpStatus.CREATED,
        "Review created successfully",
        result
      )
    );
});

exports.update = catchAsync(async (req, res) => {
  const original = await review.view(req.params.id);
  const data = await review.update(req.params.id, req.body);

  res.status(httpStatus.OK).send(
    new SuccessResponse(httpStatus.OK, "Data successfully updated", {
      original: original,
      edited: data,
    })
  );
});

exports.get = catchAsync(async (req, res) => {
  const data = await review.view(req.params.id);

  res.status(httpStatus.OK).send(new SuccessResponse(httpStatus.OK, "", data));
});
exports.getAvarge = catchAsync(async (req, res) => {
  const data = await review.getAvarge(req.params.id);

  res.status(httpStatus.OK).send(new SuccessResponse(httpStatus.OK, "", data));
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
  const data = await review.query(filter, options);

  res
    .status(httpStatus.OK)
    .send(new SuccessResponse(httpStatus.OK, "", data.results, data.metaData));
});

exports.delete = catchAsync(async (req, res) => {
  const data = await review.delete(req.params.id);
  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "Successfully deleted the review",
        data
      )
    );
});
