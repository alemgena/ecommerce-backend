const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const config = require("./config/config");
const { jwtStrategy, googleStrategy } = require("./config/passport");
const passport = require("passport");
var bodyParser = require("body-parser");
const morgan = require("./config/morgan");
const routers = require("./routes/api");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ActivityLog = require("./middlewares/activityLog");
const ApiError = require("./utils/ApiError");
const app = express();
if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
// parse json request body
app.use(express.json());
app.use(bodyParser.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// activity log
app.use(ActivityLog());

const originalSend = app.response.send;
app.response.send = function sendOverride(body) {
  this.responseBody = body;
  return originalSend.call(this, body);
};
// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
app.use(express.static("src/uploads"));
// api api routes
app.use("/api/auth", routers.auth);
app.use("/api/products", routers.product);
app.use("/api/categories", routers.category);
app.use("/api/subcategories", routers.subCategory);
app.use("/api/users", routers.user);
app.use("/api/socials", routers.socials);
app.use("/api/upload", routers.upload);
app.use("/api/newsletters", routers.newsLetter);
app.use("/api/favourites", routers.favourite);
app.use("/api/faqs", routers.faq);
app.use("/api/notifications", routers.notification);
app.use("/api/advertisement", routers.advertisement);
app.use("/api/adds", routers.adds);
app.use("/api/feedBack", routers.feedBack);
app.use("/api/addsView", routers.addsView);
app.use("/api/variants", routers.productVariant);
app.use("/api/shops",routers.shop)
app.use("/api/options", routers.productOption);
app.use("/api/values", routers.optionValues);
app.use("/api/chat", routers.chat);
app.use((req, res, next) => {
  next(new ApiError(res, httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
