const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { notification } = require("../services");
const axios = require("axios");
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
  var notification = req.body.notification;
  var to = req.body.to;
  console.log(notification)
  console.log(to)
const apiKey= "AAAAvAXvcFc:APA91bE9TVDEwv3ygPjnulh5Nm-jmwsppfb9E_twYMQZEMP5HrtCqG_R3wq5SBjvlotm30_shJEyXrKmFekuKTAPRGf1Eumhsoc7U21bhV9IO9qvR7UiYh54gg821_MLdxt_8EKBcu2u"
const headers = {
  Authorization: `key=${apiKey}`
}
const data = { notification: 
  req.body.notification
  ,
  to: req.body.to
}
const url = 'https://fcm.googleapis.com/fcm/send';
console.log("Ffff")
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
