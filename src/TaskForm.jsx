/**
 * Innehåller ett formulär för att lägga till nya uppgifter. Har inmatningsfält för uppgift och kategori.
 * Anropar addTask-funktionen från App.jsx när en ny uppgift läggs till.
 */

import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('ux');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      addTask(task, category).catch((error) => {
        setErrorMessage(`Failed to add task: ${error.message}`);
      });
      setTask('');
    } else {
      setErrorMessage('Task description cannot be empty.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New task"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="ux">UX</option>
        <option value="dev frontend">Dev Frontend</option>
        <option value="dev backend">Dev Backend</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;