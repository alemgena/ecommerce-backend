const httpStatus = require("http-status");
const { Chat, User,Message } = require("../models");
const ApiError = require("../utils/ApiError");
let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let fullDate = year + "-" + month + "-" + date
exports.add = async (body) => {
    return new Promise(async (resolve, reject) => {
        Message.create(body,async (err, message) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.NOT_FOUND,
                "Error adding the message",
                err
              )
            );
          }
          message = await message.populate("sender", "first_name  email");
          message = await message.populate("chat");
          message = await User.populate(message, {
            path: "chat.users",
            select: "first_name  email",
          });
      
          await Chat.findByIdAndUpdate(body.chat, { latestMessage: message });
          resolve(message);
        });
      });
};
exports.get = async (id) => {
  return new Promise(async (resolve, reject) => {
    Message.find({ chat: id })
    .populate("sender", "first_name   profile_picture email")
    .populate("chat")
    .exec(async (err, data) => {
      if (err) {
        return reject(
          new ApiError(
            httpStatus.NOT_FOUND,
            "Error finding the chat",
            err
          )
        );
      }
      if (!data) {
        return reject(
          new ApiError(httpStatus.NOT_FOUND, "Message not found")
        );
      }
    resolve(data)
  
  
    });
    });
};

exports.delete = async (id) => {
    return new Promise((resolve, reject) => {
      Message.findById(id, async (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Unable to find the message",
              err
            )
          );
        }
        if (!data) {
          return reject(
            new ApiError(httpStatus.NOT_FOUND, "Message not found")
          );
        }
        await data.delete();
        resolve(data);
      });
    });
  };