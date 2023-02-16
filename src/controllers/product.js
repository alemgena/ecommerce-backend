const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const { product } = require("../services");
const uploadImage = require("../helper/uploadImages");
const ObjectID = require("mongodb").ObjectId;
const SuccessResponse = require("../utils/successResponse");
const ApiError = require("../utils/ApiError");
exports.add = catchAsync(async (req, res) => {
  const body = { seller: req.user.id, ...req.body };
  const data = await product.add(body);
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", data));
});

// exports.list = catchAsync(async (req, res) => {
//   const data = await product.list();
//   res.status(200).send({ data });
// });

exports.view = catchAsync(async (req, res) => {
  const data = await product.view(req.params.id);
  res.status(httpStatus.OK).send(new SuccessResponse(httpStatus.OK, "", data));
});

exports.queryProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["filters", "search"]);
  const options = pick(req.query, [
    "sortBy",
    "limit",
    "page",
    "paginate",
    "populate",
  ]);
  const data = await product.queryProducts(filter, options);
  res
    .status(httpStatus.OK)
    .send(new SuccessResponse(httpStatus.OK, "", data.results, data.metaData));
});

exports.update = catchAsync(async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Id is not valid");
  }
  const original = await product.view(req.params.id);
  const data = await product.update(req.params.id, req.body);
  res.status(httpStatus.OK).send(
    new SuccessResponse(httpStatus.OK, "Successfully updated product", {
      original: original,
      edited: data,
    })
  );
});

exports.uploadProductImages = catchAsync(async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Id is not valid");
  }
  await uploadImage(req, res);
  if (req.files.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Pleas Select One File");
  }
  const data = await product.uploadProductImages(req.files, req.params.id);
  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "Successfully  upload product images",
        data
      )
    );
});

exports.delete = catchAsync(async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Id is not valid");
  }
  const data = await product.delete(req.params.id);
  res
    .status(httpStatus.OK)
    .send(
      new SuccessResponse(
        httpStatus.OK,
        "Successfully deleted the product",
        data
      )
    );
});
exports.viewProductImage = catchAsync(async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Id is not valid");
  }
  const data = await product.viewProductImage(req.params.id);
  res.status(httpStatus.OK).send(new SuccessResponse(httpStatus.OK, "", data));
});
exports.listImages = catchAsync(async (req, res) => {
  const data = await product.viewImages();
  res.status(httpStatus.OK).send(new SuccessResponse(httpStatus.OK, "", data));
});
