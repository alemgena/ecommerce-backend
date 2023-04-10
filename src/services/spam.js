const { Spam } = require("../models");

exports.add = async (spamBody) => {
    return Spam.create(spamBody);
};




