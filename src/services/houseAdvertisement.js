const httpStatus = require("http-status");
const { HouseAdvertisement } = require("../models");
const ApiError = require("../utils/ApiError");
exports.add=async(advertisementBody)=>{
    return HouseAdvertisement.create(advertisementBody);

}