const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { shop } = require("../services");
const SuccessResponse = require("../utils/successResponse");

exports.add = catchAsync(async (req, res) => {
    const result = await shop.add({ ...req.body });
    res
      .status(httpStatus.CREATED)
      .send(new SuccessResponse(httpStatus.CREATED, "", result));
  });
  
  exports.delete = catchAsync(async (req, res) => {
    const result = await shop.delete(req.params.id);
  
    res
      .status(httpStatus.OK)
      .send(
        new SuccessResponse(
          httpStatus.OK,
          "Successfully  the shop",
          result
        )
      );
  });
  
  exports.update = catchAsync(async (req, res) => {
    const original = await shop.get(req.params.id);
    const result = await shop.update(req.params.id, req.body);
    res.send(
      new SuccessResponse(
        httpStatus.OK,
        "successfully updated the shop",
        { original: original, edited: result }
      )
    );
  });
  exports.get = catchAsync(async (req, res) => {
    const data = await subCategory.get(req.params.id);
    res.send(
      new SuccessResponse(
        httpStatus.OK,
        " ",
        data
      )
    );
  });
  exports.list = catchAsync(async (req, res) => {
    const data = await shop.list();
    res.send(
      new SuccessResponse(
        httpStatus.OK,
        " ",
        data
      )
    );
  });