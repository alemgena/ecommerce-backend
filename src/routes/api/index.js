const auth = require("./auth");
const product = require("./product");
const category = require("./category");
const user = require("./user");
const subCategory = require("./subCategory");
const socials = require("./socials");
const upload = require("./upload");
const newsLetter = require("./newsLetter");
const spam = require("./spam");
const favourite = require("./favourite");
const faq = require("./faq");
const notification = require("./notification");
const advertisement = require("./houseAdvertisement");
const adds = require("./adds");
const feedBack = require("./feedBack");
const productVariant = require("./variant");
const shop=require("./shop")
const addsView=require('./addsView')
const productOption = require("./options");
const optionValues = require("./optionValues");
const chat=require('./chat')
const Routers = {
  auth,
  product,
  adds,
  chat,
  category,
  user,
  feedBack,
  subCategory,
  socials,
  upload,
  newsLetter,
  shop,
  spam,
  addsView,
  favourite,
  faq,
  notification,
  advertisement,
  productVariant,
  productOption,
  optionValues,
};

module.exports = Routers;
