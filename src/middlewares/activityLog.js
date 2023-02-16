const { activityLog: Log } = require("../services");
const catchAsync = require("../utils/catchAsync");

const activityLog = () =>
  catchAsync(async (req, res, next) => {
    res.on("finish", async function () {
      if (!(res.statusCode > 301 || res.statusCode < 200)) {
        if (["PATCH", "POST", "DELETE", "PUT"].indexOf(req.method) > -1) {
          if (req.user) {
            var ip =
              req.headers["x-forwarded-for"]?.split(",").shift() ||
              req.socket?.remoteAddress;
            const body = { ...JSON.parse(res.responseBody) };

            await Log.add({
              user: req.user.id,
              ip: ip,
              resource: req.originalUrl,
              action: req.method,
              EventData: {
                ...(req.method == "PATCH" || req.method == "PUT"
                  ? { original: body.data.original, edited: body.data.edited }
                  : { original: body.data }),
              },
              model: req.originalUrl.split("/")[2],
            });

            if (req.method == "PATCH") {
              body.data = { ...body.data.edited };
            }
          }
        }
      }
    });
    next();
  });

module.exports = activityLog;
