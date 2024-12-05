const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Ensure Task.js exists and is correctly defined

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch tasks from the database
    res.status(200).json(tasks); // Send tasks as a response
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).json({ error: 'Failed to fetch tasks: ' + err.message });
  }
});

// Get a specific task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    console.error('Error fetching task:', err.message);
    res.status(500).json({ error: 'Failed to fetch task: ' + err.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    // Validate required fields
    if (!title || !dueDate) {
      return res.status(400).json({ error: 'Title and dueDate are required.' });
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Error creating task:', err.message);
    res.status(400).json({ error: 'Failed to create task: ' + err.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    // Validate required fields
    if (!title || !dueDate) {
      return res.status(400).json({ error: 'Title and dueDate are required.' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, priority, status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(400).json({ error: 'Failed to update task: ' + err.message });
  }
});

// Update the status of a task
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate the status value
    const validStatuses = ['Pending', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error('Error updating status:', err.message);
    res.status(500).json({ error: 'Failed to update status: ' + err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).json({ error: 'Failed to delete task: ' + err.message });
  }
});

module.exports = router;
