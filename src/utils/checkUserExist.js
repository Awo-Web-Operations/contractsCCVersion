const { Customer } = require("../database/models");

const checkUserExist = async (email, username) => {
  let userExist = {
    email: false,
    username: false,
  };

  try {
    let foundEmail = await Customer.findOne({ email });
    let foundUsername = await Customer.findOne({ username });

    if (foundEmail) userExist.email = true;
    if (foundUsername) userExist.username = true;

    return userExist;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = checkUserExist;
