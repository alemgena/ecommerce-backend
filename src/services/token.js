const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config/config");

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(user.id, accessTokenExpires);
  const refreshToken = generateToken(user.id, refreshTokenExpires);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const refresh = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, config.jwt.secret, (err, decoded) => {
      if (err) {
        return reject(
          new ApiError(httpStatus.UNAUTHORIZED, "Invalid refresh token", err)
        );
      }

      const accessTokenExpires = moment().add(
        config.jwt.accessExpirationMinutes,
        "minutes"
      );
      const refreshTokenExpires = moment().add(
        config.jwt.refreshExpirationMinutes,
        "minutes"
      );
      const accessToken = generateToken(decoded.id, accessTokenExpires);
      const refreshToken = generateToken(decoded.id, refreshTokenExpires);

      resolve({ accessToken, refreshToken });
    });
  });
};

module.exports = {
  generateToken,
  generateAuthTokens,
  refresh,
};
