const jwt = require("jsonwebtoken");
const { APP_FRONTEND_URI, REFRESH_TOKEN_SECRET } = require("../config");
const { User } = require("../database/models");
const {
  checkUserExist,
  checkResetPasswordTokenEXpired,
  checkEmailVerifyTokenEXpired,
} = require("../services/user");
const cookieParams = require("../utils/cookieParams");
const MailController = require("./EmailController");

class AuthController {
  static async signup(req, res) {
    const { email, username } = req.body;
    try {
      const userExist = await checkUserExist(email, username);

      if (!userExist.email && !userExist.username) {
        let newUser = new User(req.body);
        await newUser.save();
        delete newUser._doc?.password;

        const accessToken = await newUser.getAccessToken(newUser._doc);
        const refreshToken = await newUser.getRefreshToken(newUser._doc);

        const mail = new MailController(newUser.email);
        await mail.sendMail(
          "Chopchow | Verify Email",
          `<h1>Welcome to Chopchow</h1> </br> <h3>Please confirm your email by clicking link below</h3>
      <a href="${APP_FRONTEND_URI}/verify-email/${newUser.emailVerificationToken}">Click this link to verify email</a>`
        );

        // send email

        res.cookie(
          "refresh_token",
          { refresh_token: refreshToken },
          cookieParams(24 * 60 * 60 * 7)
        );

        return res.status(201).json({
          ...newUser._doc,
          tokens: {
            accessToken,
            refreshToken,
          },
        });
      } else {
        return res
          .status(400)
          .json({ message: "Sorry username and/or email is taken" });
      }
    } catch (error) {
      if (error.code === 11000)
        error.message = "Sorry username and/or email is taken.";
      return res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const findUser = await User.findOne({ email });

      if (!findUser) {
        return res.status(400).json({ message: "User does not exist" });
      }

      if (await findUser.comparePassword(password)) {
        delete findUser._doc?.password;

        const accessToken = await findUser.getAccessToken(findUser._doc);
        const refreshToken = await findUser.getRefreshToken(findUser._doc);

        res.cookie(
          "refresh_token",
          { refresh_token: refreshToken },
          cookieParams(24 * 60 * 60 * 7)
        );

        return res.status(200).json({
          ...findUser._doc,
          tokens: {
            accessToken,
            refreshToken,
          },
        });
      } else {
        throw Error("Incorrect Password");
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const findUser = await User.findOne({ email });

      if (!findUser) {
        return res.status(400).json({ message: "User does not exist" });
      }

      findUser.generatedPasswordReset();
      const updatedUser = await findUser.save();

      const mail = new MailController(updatedUser.email);
      await mail.sendMail(
        "Forgot Password",
        `<h1>Chop chow</h1> </br> <h3>Reset Password</h3>
      <a href="${APP_FRONTEND_URI}/reset-password/${updatedUser.resetPasswordToken}">Click this link to reset password</a>`
      );

      res.status(200).json({
        message: "A reset email has been sent",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async forgotPasswordVerify(req, res) {
    try {
      const resetExpired = await checkResetPasswordTokenEXpired(
        req.params.token
      );

      if (resetExpired[0])
        return res.status(400).json({
          message: "Invalid or Expired Link",
        });

      return res.status(200).json({
        message: "Link is valid",
        user: resetExpired[1],
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async resetPassword(req, res) {
    try {
      const resetExpired = await checkResetPasswordTokenEXpired(
        req.params.token
      );
      const { password } = req.body;
      if (resetExpired[0])
        return res.status(400).json({
          message: "Invalid or Expired Link",
        });

      if (!password)
        return res.status(400).json({
          message: "Passwords must match",
        });

      const user = await User.findOne({ resetPasswordToken: req.params.token });
      user.password = password;
      user.resetPasswordExpires = undefined;
      user.resetPasswordToken = undefined;
      await user.save();

      return res.status(200).json({
        message: "Password have been updated",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async refreshToken(req, res) {
    // const token = req.signedCookies.refresh_token || req.headers['x-refresh-token'];
    const token = req.headers["x-refresh-token"];
    console.log("token___", res);

    try {
      if (!token) return res.status(401).json("No token, authorization denied");

      const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
      const { _id } = decoded;

      let foundUser = await User.findById(_id);
      delete foundUser._doc.password;

      let accessToken = await foundUser.getAccessToken(foundUser._doc);
      let refreshToken = await foundUser.getRefreshToken(foundUser._doc);

      res.cookie(
        "refresh_token",
        { refresh_token: refreshToken },
        cookieParams(24 * 60 * 60 * 7)
      );

      return res.status(200).json({
        ...foundUser._doc,
        tokens: { accessToken, refreshToken },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async verifyEmail(req, res) {
    const verificationExpired = await checkEmailVerifyTokenEXpired(
      req.params.token
    );

    if (verificationExpired[0])
      return res.status(400).json({
        message: "Invalid or Expired Link",
      });

    const user = verificationExpired[1];
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
    });
  }
}

module.exports = { AuthController };
