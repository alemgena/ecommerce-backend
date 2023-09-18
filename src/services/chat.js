const httpStatus = require("http-status");
const { Chat, User } = require("../models");
const ApiError = require("../utils/ApiError");
const { async } = require("@firebase/util");
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
exports.createChat = async (id,userId) => {
  return new Promise(async (resolve, reject) => {
    Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage")
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
      data = await User.populate(data, {
        path: "latestMessage.sender",
        select: "first_name  email",
      });
   
  if (data.length > 0) {
    resolve(data[0])
  }
  else{
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [id, userId],
    };
    Chat.create(chatData, async(err, data) => {
      if (err) {
        return reject(
          new ApiError(
            httpStatus.NOT_FOUND,
            "Error adding the chat",
            err
          )
        );
      }
      const FullChat = await Chat.findOne({ _id: data._id }).populate(
        "users",
        "-password"
      );
      resolve(FullChat);
    });


  }
  
    });
    });
};
exports.get = async (id) => {
 
  return new Promise(async (resolve, reject) => {
    Chat.find({ users: { $elemMatch: { $eq: id} } })
    .populate("users", "-password")
    .populate("latestMessage")  
    .sort({ updatedAt: -1 })
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
      data = await User.populate(data, {
        path: "latestMessage.sender",
        select: "first_name  email",
      });
    resolve(data)
  
  
    });
    });
  };
  
  exports.delete = async (id) => {
    return new Promise((resolve, reject) => {
      Chat.findById(id, async (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.NOT_FOUND,
              "Unable to find the  chat",
              err
            )
          );
        }
        if (!data) {
          return reject(
            new ApiError(httpStatus.NOT_FOUND, "chat not found")
          );
        }
        await data.delete();
        resolve(data);
      });
    });
  };