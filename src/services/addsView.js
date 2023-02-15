const httpStatus = require("http-status");
const { AddsView } = require("../models");
const ApiError = require("../utils/ApiError");
exports.add = async (body) => {
  const adds=await AddsView.findOne({addsId:body.addsId})

    if (await adds&& AddsView.isUserView(body.userId)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "user with this id already exist"
      );
    }
    return AddsView.create(body);
  };
  exports.countViews = async (addsId) => {
  const count =AddsView.countDocuments({addsId})
    return count;
  };
  