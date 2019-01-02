require("../models/User");
require("../models/Blog");

const mongoose = require("mongoose");
const keys = require("../config/keys");
// jest.setTimeout(100000);
mongoose.Promise = global.Promise;
mongoose.connect(
  keys.mongoURI,
  { useMongoClient: true }
);
