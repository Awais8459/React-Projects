import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Page.css'; // Import a CSS file for styling

export default function Page() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await Axios.get('http://localhost:4000/todos');
      setTodos(response.data);
    } catch (error) {
      console.log('Failed to fetch todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await Axios.post('http://localhost:4000/todos', {
        title: updateTitle,
        description: updateDescription,
      });
      setTodos([...todos, response.data]);
      setUpdateTitle('');
      setUpdateDescription('');
    } catch (error) {
      console.log('Failed to add todo:', error);
    }
  };

  const updateTodo = async (id) => {
    try {
      const response = await Axios.put(`http://localhost:4000/todos/${id}`, {
        title: updateTitle,
        description: updateDescription,
      });
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos];
        const index = updatedTodos.findIndex((todo) => todo._id === id);
        updatedTodos[index] = response.data;
        return updatedTodos;
      });
      setUpdateTitle('');
      setUpdateDescription('');
      setSelectedTodo(null); // Reset selected todo
    } catch (error) {
      console.log('Failed to update todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    setSelectedTodo(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await Axios.delete(`http://localhost:4000/todos/${selectedTodo}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== selectedTodo));
      setShowDeleteDialog(false);
    } catch (error) {
      console.log('Failed to delete todo:', error);
    }
  };

  return (
    <div className="App">
      <h2>To-Do App</h2>
      <div className="form-container">
        {selectedTodo ? (
          <>
            <label htmlFor="updateTitle">Task:</label>
            <input
              id="updateTitle"
              type="text"
              value={updateTitle}
              onChange={(event) => setUpdateTitle(event.target.value)}
            />
            <label htmlFor="updateDescription">Description:</label>
            <input
              id="updateDescription"
              type="text"
              value={updateDescription}
              onChange={(event) => setUpdateDescription(event.target.value)}
            />
          </>
        ) : (
          <>
            <label htmlFor="title">Task:</label>
            <input
              id="title"
              type="text"
              value={updateTitle}
              onChange={(event) => setUpdateTitle(event.target.value)}
            />
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              type="text"
              value={updateDescription}
              onChange={(event) => setUpdateDescription(event.target.value)}
            />
          </>
        )}
        <button onClick={selectedTodo ? () => updateTodo(selectedTodo) : addTodo}>
          {selectedTodo ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>
      <h2>Todo List</h2>
      {todos.map((todo) => (
        <div key={todo._id} className="card">
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <div className="button-container">
            <button
              className="update-button"
              onClick={() => {
                setSelectedTodo(todo._id);
                setUpdateTitle(todo.title);
                setUpdateDescription(todo.description);
              }}
            >
              Update
            </button>
            <button className="delete-button" onClick={() => deleteTodo(todo._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="dialog">
          <p>Are you sure you want to delete the task?</p>
          <div className="dialog-buttons">
            <button onClick={() => setShowDeleteDialog(false)}>Cancel</button>
            <button onClick={() => confirmDelete()}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
