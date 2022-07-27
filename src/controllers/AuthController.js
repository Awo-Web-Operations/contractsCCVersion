const { Customer } = require("../database/models");
const checkUserExist = require("../utils/checkUserExist");
const cookieParams = require("../utils/cookieParams");

class AuthController {
  static async signup(req, res) {
    const { email, username } = req.body;
    try {
      const userExist = await checkUserExist(email, username);

      if (!userExist.email && !userExist.username) {
        let newUser = new Customer(req.body);
        await newUser.save();
        delete newUser._doc?.password;

        const accessToken = await newUser.getAccessToken(newUser._doc);
        const refreshToken = await newUser.getAccessToken(newUser._doc);

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
      const findUser = await Customer.findOne({ email });

      if (!findUser) {
        return res.status(400).json({ message: "User does not exist" });
      }

      if (await findUser.comparePassword(password)) {
        delete findUser._doc?.password;

        const accessToken = await findUser.getAccessToken(findUser._doc);
        const refreshToken = await findUser.getAccessToken(findUser._doc);

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
}

module.exports = { AuthController };
