const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const SuccessResponse = require("../utils/successResponse");
const { houseAdvertisement } = require("../services");

exports.add = catchAsync(async (req, res) => {
    const result = await houseAdvertisement.add({ ...req.body });
    res
      .status(httpStatus.CREATED)
      .send(new SuccessResponse(httpStatus.CREATED, "", result));
  });
  
  exports.delete = catchAsync(async (req, res) => {
    const result = await houseAdvertisement.delete(req.params.id);
  
    res
      .status(httpStatus.OK)
      .send(
        new SuccessResponse(
          httpStatus.OK,
          "Successfully  the advertisement",
          result
        )
      );
  });
  
  exports.update = catchAsync(async (req, res) => {
    const original = await houseAdvertisement.get(req.params.id);
    const result = await houseAdvertisement.update(req.params.id, req.body);
    res.send(
      new SuccessResponse(
        httpStatus.OK,
        "successfully updated the advertisement",
        { original: original, edited: result }
      )
    );
  });
  exports.get = catchAsync(async (req, res) => {
    const data = await houseAdvertisement.get(req.params.id);
    res.send(
      new SuccessResponse(
        httpStatus.OK,
        " ",
        data
      )
    );
  });
  exports.list = catchAsync(async (req, res) => {
    const data = await houseAdvertisement.list();
    res.send(
      new SuccessResponse(
        httpStatus.OK,
        " ",
        data
      )
    );
  });