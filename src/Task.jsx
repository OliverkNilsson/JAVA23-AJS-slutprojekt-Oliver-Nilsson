/**
 * Visar en enskild uppgift. Visar uppgiftsbeskrivningen, kategorin och den tilldelade personen.
 * Innehåller knappar för att ändra uppgiftens status (till "in progress" eller "done") och för att ta bort uppgiften.
 * Tilldelar en person till uppgiften när den flyttas till "in progress".
 */

import React, { useState } from 'react';

const Task = ({ taskId, task, markTaskAsInProgress, markTaskAsDone, removeTask }) => {
  const [assignee, setAssignee] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const handleAssign = () => {
    if (assignee) {
      markTaskAsInProgress(taskId, assignee)
        .catch((error) => {
          setErrorMessage(`Failed to assign task: ${error.message}`);
        });
      setAssignee("");
    } else {
      setErrorMessage("Please enter a name to assign the task.");
    }
  };

  return (
    <div className="task">
      {errorMessage && <p className="error">{errorMessage}</p>}
      <p>{task.assignment}</p>
      <p>Category: {task.category}</p>
      <p>Status: {task.status}</p>
      {task.status === 'to do' && (
        <div>
          <input
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            placeholder="Enter assignee name"
          />
          <button onClick={handleAssign}>Assign &gt;&gt;</button>
        </div>
      )}
      {task.status === 'in progress' && (
        <div>
          <p>Assigned to: {task.assigned}</p>
          <button onClick={() => markTaskAsDone(taskId).catch((error) => {
            setErrorMessage(`Failed to mark task as done: ${error.message}`);
          })}>Done &gt;&gt;</button>
        </div>
      )}
      {task.status === 'done' && (
        <button onClick={() => removeTask(taskId).catch((error) => {
          setErrorMessage(`Failed to remove task: ${error.message}`);
        })}>Remove X</button>
      )}
    </div>
  );
};

export default Task;