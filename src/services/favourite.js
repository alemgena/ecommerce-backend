const { Favourite } = require("../models");

exports.add = async (favouriteBody) => {
    return Favourite.create(favouriteBody);
};





