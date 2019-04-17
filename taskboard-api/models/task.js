var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Tasks must have a name!"
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  deadline: Date,
  status: {
    type: String,
    default: "open"
  }
});

var Task = mongoose.model("Task", taskSchema);
module.exports = Task;