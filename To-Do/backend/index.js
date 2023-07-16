const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://CRUD:crud1234@cluster0.gqhkf1a.mongodb.net/CRUD?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.log("MongoDB connection error: ", error);
});



const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
});
const TodoModel = mongoose.model("Todo", todoSchema);



app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTodo = new TodoModel({ title, description });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});




app.get("/todos", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});




app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});




app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await TodoModel.findByIdAndRemove(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});



const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});