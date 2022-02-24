const Task = require("../models/task.module.js");

// to create task
exports.createTask = async (req, res) => {
  try {
    const task = await new Task(req.body).save();
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    console.log(error);
  }
};
