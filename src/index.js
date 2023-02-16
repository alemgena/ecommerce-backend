const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");

const { newEnforcer } = require("casbin");
const { MongooseAdapter } = require("casbin-mongoose-adapter");
const path = require("path");
let webhook = require('./webhook.js')
let http = require('http').createServer(app)
let io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});
webhook.start(io)
let server;
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(async () => {
    logger.info("Connected to MongoDB");
    global.enforcer = await Casbin();
    server = http.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

const Casbin = async () => {
  const model = path.resolve(__dirname, "./config/casbin_model.conf");
  const adapter = await MongooseAdapter.newAdapter(config.mongoose.url);
  if (!adapter) {
    return reject(
      new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Unable to connect to casbin adapter"
      )
    );
  }
  const enforcer = await newEnforcer(model, adapter);
  if (!adapter) {
    return reject(
      new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Unable to initiate a casbin instance"
      )
    );
  }
  logger.info("connected to casbin");
  return enforcer;
};
