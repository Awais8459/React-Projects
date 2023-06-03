import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Page.css'

const Page = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/todos');
      setTodos(response.data);
    } catch (error) {
      console.log('Failed to fetch todos:', error);
    }
  };

  const handleCreateTodo = async () => {
    if (!title || !description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/todos', { title, description });
      setTodos([...todos, response.data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.log('Failed to create todo:', error);
    }
  };

  const handleUpdateTodo = async () => {
    if (!title || !description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/todos/${editingTodo._id}`, {
        title,
        description,
      });
      const updatedTodos = todos.map(todo =>
        todo._id === response.data._id ? response.data : todo
      );
      setTodos(updatedTodos);
      setTitle('');
      setDescription('');
      setEditingTodo(null);
    } catch (error) {
      console.log('Failed to update todo:', error);
    }
  };

  const handleDeleteConfirmation = todo => {
    setEditingTodo(todo);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteTodo = async () => {
    try {
      await axios.delete(`http://localhost:4000/todos/${editingTodo._id}`);
      const updatedTodos = todos.filter(todo => todo._id !== editingTodo._id);
      setTodos(updatedTodos);
      setEditingTodo(null);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.log('Failed to delete todo:', error);
    }
  };

  const renderTodos = () => {
    return todos.map(todo => (
      <div key={todo._id} className="todo-card">
        <div className="todo-info">
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
        </div>
        <div className="todo-actions">
          <button onClick={() => handleEditTodo(todo)}>Edit</button>
          <button onClick={() => handleDeleteConfirmation(todo)}>Delete</button>
        </div>
      </div>
    ));
  };

  const handleEditTodo = todo => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingTodo(todo);
  };

  return (
    <div>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        {!editingTodo && !showDeleteConfirmation ? (
          <button onClick={handleCreateTodo}>Add</button>
        ) : (
          <>
            {editingTodo && !showDeleteConfirmation ? (
              <>
                <button onClick={handleUpdateTodo}>Update</button>
                <button onClick={() => setEditingTodo(null)}>Cancel</button>
              </>
            ) : null}
          </>
        )}
      </div>

      {renderTodos()}

      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete the record?</p>
          <button onClick={handleDeleteTodo}>Yes</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default Page;
