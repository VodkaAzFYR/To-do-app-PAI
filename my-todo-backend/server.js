require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "new" },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

app.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  const savedTask = await newTask.save();
  res.send(savedTask);
});

app.put("/tasks/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(updatedTask);
});

app.delete("/tasks/:id", async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  res.send(deletedTask);
});

mongoose
  .connect(
    process.env.DATA_BASE_URL
  )
  .then(() =>
    app.listen(5000, () => console.log("Server running on port 5000"))
  )
  .catch((err) => console.error(err));
