const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://pramodgunjal1996:Pramod9762@cluster0.cjvg5x1.mongodb.net/mern",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Task model
const Task = mongoose.model("Task", {
  title: {
    type: String,
    required: true, // Ensure the title is required
    trim: true, // Trim whitespace from the title
  },
  description: String,
});
// Define a User model (assuming you're using MongoDB with Mongoose)
const User = mongoose.model("User", {
  employee_id: String,
  password: String,
});

// Secret key for JWT (should be kept secret)
const JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xl";

// Define a login route
app.post("/login", async (req, res) => {
  try {
    const { employee_id, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ employee_id });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new task
app.post("/tasks", async (req, res) => {
  try {
    // Check if the task title is empty
    if (!req.body.title || req.body.title.trim() === "") {
      return res.status(400);
    }

    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: "Invalid task data" });
  }
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Get a single task by ID
app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(task);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid task ID" });
  }
});

// Update a task by ID
app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(task);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid task data" });
  }
});

// Delete a task by ID
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid task ID" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
