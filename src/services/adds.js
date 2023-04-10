const {Adds}=require('../models')
exports.add = async (addsBody) => {
    return Adds.create(addsBody);
  };