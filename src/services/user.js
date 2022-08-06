const { User } = require("../database/models");

const checkUserExist = async (email, username) => {
  let userExist = {
    email: false,
    username: false,
  };

  try {
    let foundEmail = await User.findOne({ email });
    let foundUsername = await User.findOne({ username });

    if (foundEmail) userExist.email = true;
    if (foundUsername) userExist.username = true;

    return userExist;
  } catch (error) {
    throw Error(error);
  }
};

const checkResetPasswordTokenEXpired = async (token) => {
  let resetExpired = true;
  const findUser = await User.findOne({
    resetPasswordToken: token,
  });

  if (!findUser) {
    return [resetExpired];
  }

  resetExpired = new Date(findUser.resetPasswordExpires) - new Date() <= 0;

  delete findUser._doc.password;

  return [resetExpired, findUser._doc];
};

const checkEmailVerifyTokenEXpired = async (token) => {
  let verifyExpired = true;
  const findUser = await User.findOne({
    emailVerificationToken: token,
  });

  if (!findUser) {
    return [verifyExpired];
  }

  verifyExpired = new Date(findUser.emailVerificationToken) - new Date() <= 0;

  return [verifyExpired, findUser];
};

module.exports = {
  checkUserExist,
  checkResetPasswordTokenEXpired,
  checkEmailVerifyTokenEXpired,
};
