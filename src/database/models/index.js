const mongoose = require('mongoose');

// set mongoose to use promises
mongoose.set('debug', true);
mongoose.Promise = Promise;

module.exports.User = require("./User");
module.exports.Product = require("./Product");
module.exports.Store = require("./Store");