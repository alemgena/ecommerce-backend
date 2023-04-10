const { Faq } = require("../models");

exports.add = async (faqBody) => {
    return Faq.create(faqBody);
};

exports.list = async () => {
    return Faq.find({});
};

exports.update = async (id, faqData) => {
    const faq = await Faq.findOne({ _id: id });
    if (!faq) {
      throw new ApiError(httpStatus.BAD_REQUEST, "category not found");
    }
    const updatedFaq = await Faq.findOneAndUpdate(
      id,
      { $set: faqData },
      { returnOriginal: false }
    );
    return updatedFaq;
  };

exports.delete= async (id) => {
    const faq = await Faq.findOne({ _id: id });
    if (!faq) {
      throw new ApiError(httpStatus.BAD_REQUEST, "category not found");
    }
    const myquery = { _id: id };
    const newvalues = { $set: { state: "INACTIVE" } };
    await Faq.deleteOne(myquery);
    return myquery;
  };


exports.get = async (id) => {
  return new Promise((resolve, reject) => {
    Faq.findById(id, async (err, data) => {
      if (err) {
        return reject(
          new ApiError(httpStatus.NOT_FOUND, "Unable to find the faq", err)
        );
      }
      if (!data) {
        return reject(new ApiError(httpStatus.NOT_FOUND, "faq not found"));
      }
      resolve(data);
    });
  });
};