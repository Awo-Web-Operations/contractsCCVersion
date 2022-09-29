const { Store } = require("../database/models");
const asyncHandler = require("../utils/asyncHandler");

const verifyStoreAmdin = asyncHandler(async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.storeId);

    if (!store) res.status(400).json({ message: "Store does not exist" });

    if (store.admins.some((admin) => admin.userId == req.decodedUser._id)) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log("errr______", error);
    return res.status(401).json({ message: "Store does not exist" });
  }
});

module.exports = { verifyStoreAmdin };
