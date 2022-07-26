const { Customer } = require("../database/models");
const checkUserExist = require("../utils/checkUserExist");

class AuthController {
  static async signup(req, res) {
    const { email, username } = req.body;
    try {
      const userExist = await checkUserExist(email, username);

      if (userExist.email && userExist.username) {
        let newUser = new Customer(req.body);
        await newUser.save();

        // send email

        // res.cookie(
        //   "refresh_token",
        //   { refresh_token: refreshToken },
        //   cookieParams(24 * 60 * 60 * 7)
        // );
        delete newUser._doc?.password;
        return res.status(201).json({
          ...newUser._doc,
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
}

module.exports = { AuthController };
