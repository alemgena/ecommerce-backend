const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { faq } = require("../services");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
  const data = await faq.add({ ...req.body });
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", data));
});

exports.list = catchAsync(async (req, res) => {
  const data = await faq.list();
  res.status(httpStatus.OK).send(new SuccessResponse(httpStatus.OK, "", data));
});

exports.update = catchAsync(async (req, res) => {
  const original = await faq.get(req.params.id);
  const updatedFaq = await faq.update(req.params.id, req.body);
  res.status(httpStatus.OK).send(
    new SuccessResponse(httpStatus.OK, "", {
      original: original,
      edited: updatedFaq,
    })
  );
});

exports.delete = catchAsync(async (req, res) => {
  const deletedFaq = await faq.delete(req.params.id);
  res
    .status(httpStatus.OK)
    .send(new SuccessResponse(httpStatus.CREATED, "", deletedFaq));
});
