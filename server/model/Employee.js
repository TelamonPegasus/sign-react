const mongoose = require("mongoose");
const dayjs = require("dayjs");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: dayjs().format("YYYY-MM-DD hh:mm:ss"),
  },
});

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
