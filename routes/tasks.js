const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// Create Task
router.post('/', auth, async (req, res) => {
  const { title, description, category, tags, priority, dueDate } = req.body;
  try {
    const newTask = new Task({
      user: req.user.id,
      title,
      description,
      category,
      tags,
      priority,
      dueDate
    });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Tasks with optional filtering & search
router.get('/', auth, async (req, res) => {
  const { category, status, search } = req.query;
  let query = { user: req.user.id };
  if (category) query.category = category;
  if (status) query.status = status;
  if (search) query.title = { $regex: search, $options: 'i' };

  try {
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Task
router.put('/:id', auth, async (req, res) => {
  const { title, description, category, tags, status, priority, dueDate } = req.body;
  try {
    let task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task)
      return res.status(404).json({ message: 'Task not found' });
    task.title = title || task.title;
    task.description = description || task.description;
    task.category = category || task.category;
    task.tags = tags || task.tags;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task)
      return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
