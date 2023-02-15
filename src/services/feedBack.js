const {FeedBack}=require('../models')
exports.add = async (body) => {
    return FeedBack.create(body);
  };
  exports.list = async () => {
    return FeedBack.find({}).populate("userId");
  };