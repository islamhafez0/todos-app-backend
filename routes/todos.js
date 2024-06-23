const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const { default: mongoose } = require("mongoose");

router.post("/", async (req, res) => {
  const { title, userId, username } = req.body;
  try {
    const todo = new Todo({
      title: title,
      completed: false,
      user: userId,
      username,
    });
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const todos = await Todo.find({ user: userId });
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findById(id);
  res.json(todo);
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newTodo = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, newTodo, {
      new: true,
    });
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo Not Found!" });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.error("Error while updateing the document", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo Not Found!" });
    }
    res.json({
      message: "Todo deleted successfully",
      todo: deletedTodo,
    });
  } catch (error) {
    console.error("Error while updateing the document", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
