const { Store, User } = require("../database/models");

class StoresController {
  static async createStore(req, res) {
    try {
      const { _id: userId } = req.decodedUser;
      const foundStore = await Store.findOne({ owner: userId });
      if (foundStore)
        return res.status(400).json({ message: "User can only own one store" });

      const store = new Store({
        ...req.body,
      });

      store.owner = userId;
      store.admins.push({ userId, role: "STORE_ADMIN" });

      await store.save();
      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { stores: store._id } }
      );

      res.status(201).json(store);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = StoresController;
