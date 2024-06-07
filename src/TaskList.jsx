/**
 * Visar en lista med uppgifter baserat på deras status (antingen "to do", "in progress" eller "done").
 * Tar emot uppgifterna och statusen som props. Renderar Task-komponenter för varje uppgift i listan.
 */

import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, status, markTaskAsInProgress, markTaskAsDone, removeTask }) => {
  const filteredTasks = Object.entries(tasks).filter(([key, task]) => task.status === status);

  return (
    <div className='task-list'>
      <h2>{status}</h2>
      {filteredTasks.map(([key, task]) => (
        <Task
          key={key}
          taskId={key}
          task={task}
          markTaskAsInProgress={markTaskAsInProgress}
          markTaskAsDone={markTaskAsDone}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
};

export default TaskList;