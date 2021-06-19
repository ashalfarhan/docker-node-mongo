const { Schema, model } = require("mongoose");

const Student = model(
  "students",
  new Schema({
    name: {
      type: String,
      unique: true,
    },
    major: String,
    age: Number,
  })
);

module.exports = Student;
