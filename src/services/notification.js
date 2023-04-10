
const { Notification } = require("../models");

exports.add = async (notificationBody) => {
    return Notification.create(notificationBody);
};

exports.list = async () => {
    return Notification.find({});
};

exports.update = async (id, notificationData) => {
    const notification = await Notification.findOne({ _id: id });
    if (!notification) {
      throw new ApiError(httpStatus.BAD_REQUEST, "notification not found");
    }
    const updatedNotification = await Notification.findOneAndUpdate(
      id,
      { $set: notificationData },
      { returnOriginal: false }
    );
    return updatedNotification;
  };

exports.delete= async (id) => {
    const notification = await Notification.findOne({ _id: id });
    if (!notification) {
      throw new ApiError(httpStatus.BAD_REQUEST, "notification not found");
    }
    const myquery = { _id: id };
    const newvalues = { $set: { state: "INACTIVE" } };
    await Notification.deleteOne(myquery);
    return myquery;
  };



exports.get = async (id) => {
  return new Promise((resolve, reject) => {
    Notification.findById(id, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(httpStatus.NOT_FOUND, "Unable to find the notification", err)
        );
      }
      if (!data) {
        return reject(
          new ApiError(httpStatus.NOT_FOUND, "notification not found")
        );
      }
      resolve(data);
    });
  });
};