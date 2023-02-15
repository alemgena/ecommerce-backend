const httpStatus = require("http-status");
const nodemailer = require("nodemailer");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const generator = require("generate-password");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  port: 465,
  ignoreTLS: true,
  secureConnection: false,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  requireTLS: true,
});
exports.register = async (userBody) => {
  return new Promise(async (resolve, reject) => {
    if (await User.isEmailTaken(userBody.email)) {
      return reject(
        new ApiError(httpStatus.BAD_REQUEST, "Email already taken")
      );
    }
    let code = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    let userCode = {
      code: code,
    };
    let mailOptions = {
      from: process.env.GMAIL, // sender address
      to: userBody.email, // list of receivers
      subject: "Account activation", // Subject line
      text: `Wellcome, This is the Activation code: ${code}`, // plain text body
      html: `<style>@import url('https://fonts.googleapis.com/css2?family=Cabin&display=swap');</style>
            <div style="border: 1px solid green; border-radius: 5px; padding: 30px;">&nbsp; &nbsp;&nbsp; &nbsp;
            <div style="text-align: center; font-family: 'Cabin', sans-serif; margin: auto;">
                <div style="color: green; font-size: 14px; margin: 20px;">
            <strong>
                <span style="letter-spacing: 4px;">THANKS FOR SIGNING UP!</span>
            </strong>
            </div>
            <div style="margin: 0px 60px 20px; height: 0.2px; background-color: rgba(244,151,3,.8);">&nbsp;</div>
            <div style="color: #143d59; font-size: 20px; margin: 20px 0px 30px;">Wellcome.</div>
                <span style="color: #143d59;">
                <span style="font-size: 20px;">This is your activation code: ${code}.</span>
                </span>
            </div>
            </div>`,
    };
    const sendInfo = await transporter.sendMail(mailOptions);
    if (sendInfo.accepted.length > 0) {
      Object.assign(userBody, userCode);
      User.create(userBody, (err, data) => {
        if (err) {
          return reject(
            new ApiError(
              httpStatus.BAD_REQUEST,
              "Error registering the user",
              err
            )
          );
        }
        resolve(data);
      });
    } else {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Could not send the activation code, Try again!"
      );
    }
  });
};
exports.loginUserWithEmailAndPassword = async (email, password) => {
  return new Promise(async(resolve, reject) => {
    User.findOne({ email },async (err, data) => {
      if (err) {
        return reject(
          new ApiError(httpStatus.UNAUTHORIZED, "Unable to login",)
        );
      }

      if ( !data || ! await data.isPasswordMatch(password)) {
        return reject(
          new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password")
        );
      }
      resolve(data);
    });
  });
};
exports.emailVerify = async (email, code) => {
  const user = await User.findOne({ email: email, code: code });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or code");
  }
  user.isEmailVerified = true;
  user.code = null;
  user.save();
  return user;
};
exports.forgetPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email");
  }
  let password = generator.generate({
    length: 8,
    numbers: true,
  });
  let mailOptions = {
    from: process.env.GMAIL, // sender address
    to: email, // list of receivers
    subject: "Forget password", // Subject line
    text: `Welcome, Use this password to login: ${password}`, // plain text body
    html: `<style>@import url('https://fonts.googleapis.com/css2?family=Cabin&display=swap');</style>
            <div style="border: 1px solid green; border-radius: 5px; padding: 30px;">&nbsp; &nbsp;&nbsp; &nbsp;
            <div style="text-align: center; font-family: 'Cabin', sans-serif; margin: auto;">
                <div style="color: green; font-size: 14px; margin: 20px;">
            <strong>
            <span style=" letter-spacing: 4px;">THANKS FOR CHOOSING US!</span></strong>
            </strong>
            </div>
            <div style="margin: 0px 60px 20px; height: 0.2px; background-color: rgba(244,151,3,.8);">&nbsp;</div>
            <div style="color: #143d59; font-size: 20px; margin: 20px 0px 30px;">Wellcome.</div>
                <span style="color: #143d59;">
                <span style="font-size: 20px; ">Use this password to login: ${password}.</span>
                </span>
            </div>
            </div>`,
  };
  const sendInfo = await transporter.sendMail(mailOptions);
  if (sendInfo.accepted.length > 0) {
    user.password = password;
    user.save();
    return `Your new password is sent to ${email}. Check your email.`;
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Could not send the activation code, Try again!"
    );
  }
};
