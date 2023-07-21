const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { notification } = require("../services");
const axios = require("axios");
const config = require("../config/config");
const SuccessResponse = require("../utils/successResponse");
const ApiError = require("../utils/ApiError");
exports.add = catchAsync(async (req, res) => {
  const data = await notification.add(req.body);
  res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.CREATED, "", data));
});
exports.list = catchAsync(async (req, res) => {
  const data = await notification.list();
  res.status(httpStatus.OK).send(new SuccessResponse(httpStatus.OK, "", data));
});
exports.userNotification = catchAsync(async (req, res) => {
  const data = await notification.getUserNotification(req.user.id);
  res.status(httpStatus.OK).send(new SuccessResponse(httpStatus.OK, "", data));
});
exports.update = catchAsync(async (req, res) => {
  const original = await notification.get(req.params.id);
  const updatedNotification = await notification.update(
    req.params.id,
    req.body
  );
  res.status(httpStatus.OK).send(
    new SuccessResponse(httpStatus.OK, "", {
      original: original,
      edited: updatedNotification,
    })
  );
});

exports.delete = catchAsync(async (req, res) => {
  const deletedNotification = await notification.delete(req.params.id);
  res
    .status(httpStatus.OK)
    .send(new SuccessResponse(httpStatus.OK, "", deletedNotification));
});

exports.sendNotification = catchAsync(async (req, res) => {
const headers = {
  Authorization: `key=${config.apiKey}`
}
const data = { notification: 
  req.body.notification
  ,
  to: req.body.to
}
const url = 'https://fcm.googleapis.com/fcm/send';
await axios.post(url, data, {headers}).then(function (response) {
  res
    .status(httpStatus.OK)
    .send(new SuccessResponse(httpStatus.OK, "", response.data));
})
.catch(function (error) {
  throw new ApiError(
    httpStatus.BAD_REQUEST,
    "error sending the notification",
    error
  );
});
});
