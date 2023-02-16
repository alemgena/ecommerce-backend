const { Chat } = require("../models");
let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let fullDate = year + "-" + month + "-" + date
exports.add = async (body) => {
    return new Promise(async (resolve, reject) => {
        Chat.create(body, (err, data) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.NOT_FOUND,
                "Error adding the chat",
                err
              )
            );
          }
          resolve(data);
        });
      });
};
exports.get = async (id) => {
    return new Promise((resolve, reject) => {
        Chat.find({from:id,createdAt:{$eq:new Date(fullDate)}}, async (err, data) => {
          if (err) {
            return reject(
              new ApiError(httpStatus.NOT_FOUND, "Unable to find the chat", err)
            );
          }
          if (!data) {
            return reject(new ApiError(httpStatus.NOT_FOUND, "chat not found"));
          }
          resolve(data);
        });
      });
  };
  exports.list = async (id) => {
    return new Promise((resolve, reject) => {
        Chat.find({from:id}, async (err, data) => {
          if (err) {
            return reject(
              new ApiError(httpStatus.NOT_FOUND, "Unable to find the chat", err)
            );
          }
          if (!data) {
            return reject(new ApiError(httpStatus.NOT_FOUND, "chat not found"));
          }
          resolve(data);
        });
      });
  };