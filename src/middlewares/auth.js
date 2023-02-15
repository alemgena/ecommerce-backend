const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
  }
  req.user = user;
  resolve();
  // await global.enforcer.addPolicy("admin", req.originalUrl, req.method);
  // await global.enforcer.addGroupingPolicy(user.id, "admin");
  // await global.enforcer.loadPolicy();
  // const res = await global.enforcer.enforce(
  //   user.id,
  //   req.originalUrl,
  //   req.method
  // );
  // if (res) {
  //   resolve();
  // } else {
  //   return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
  // }
};

const auth = () => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
