const express = require("express");
const Student = require("./db/models/student");
const studentSchema = require("./validation/student.validation");

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).send({
    message: "Successfully run in docker",
  });
});

app.get("/students", async (_, res) => {
  const result = await Student.find();
  res.status(200).send({
    result,
  });
});

app.post("/students/new", async (req, res) => {
  try {
    const valid = await studentSchema.validate(req.body);
    const newStudent = new Student(valid);
    const result = await newStudent.save();
    if (!result) {
      throw Error("Failed to save new student");
    }
    res.status(201).send({
      message: "Success create new user",
      result,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = app;
