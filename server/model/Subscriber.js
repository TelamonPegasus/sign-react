const mongoose = require("mongoose");
const dayjs = require("dayjs");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SubscriberSchema = new Schema({
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
    User: Number,
    Editor: Number,
    Admin: Number,
  },
  refreshToken: String,
  date: {
    type: String,
    default: dayjs().format("YYYY-MM-DD hh:mm:ss"),
  },
});

SubscriberSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }

    next();
  } catch (error) {
    next(error);
  }
});

SubscriberSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const Subscriber = mongoose.model("subscriber", SubscriberSchema); // change to singular

module.exports = Subscriber;
