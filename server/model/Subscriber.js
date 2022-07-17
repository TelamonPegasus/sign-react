const mongoose = require("mongoose");
const dayjs = require("dayjs");
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  refreshToken: String,
  date: {
    type: String,
    default: dayjs().format("YYYY-MM-DD hh:mm:ss"),
  },
});

const Subscriber = mongoose.model("subscriber", subscriberSchema); // change to singular

module.exports = Subscriber;
