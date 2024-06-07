/**
 * Använder Firebase för att hämta och uppdatera uppgifter. Delar uppgifterna i tre kolumner baserat på deras
 * status: "to do", "in progress" och "done". Har funktioner för att lägga till uppgifter, markera uppgifter
 * som "in progress" och "done", och ta bort uppgifter. Renderar TaskForm-komponenten och tre TaskList-komponenter
 * för att visa uppgifterna.
 */

import React, { useState, useEffect } from "react";
import { tasksRef, set, push, onValue, remove, ref, child } from "./firebase";
import TaskForm from "./Taskform";
import TaskList from "./TaskList";
import "./css/style.css";

const App = () => {
  const [tasks, setTasksState] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    onValue(
      tasksRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setTasksState(data);
        } else {
          setTasksState({});
        }
      },
      (error) => {
        setErrorMessage(`Failed to load tasks: ${error.message}`);
      }
    );
  }, []);

  const addTask = (task, category) => {
    return new Promise((resolve, reject) => {
      const newTaskRef = push(tasksRef);
      set(newTaskRef, {
        assignment: task,
        category: category,
        status: "to do",
        assigned: "none",
      })
        .then(resolve)
        .catch(reject);
    });
  };

  const markTaskAsInProgress = (taskId, assignee) => {
    return new Promise((resolve, reject) => {
      const taskRef = child(tasksRef, taskId);
      set(taskRef, {
        ...tasks[taskId],
        status: "in progress",
        assigned: assignee,
      })
        .then(resolve)
        .catch(reject);
    });
  };

  const markTaskAsDone = (taskId) => {
    return new Promise((resolve, reject) => {
      const taskRef = child(tasksRef, taskId);
      set(taskRef, { ...tasks[taskId], status: "done" })
        .then(resolve)
        .catch(reject);
    });
  };

  const removeTask = (taskId) => {
    return new Promise((resolve, reject) => {
      const taskRef = child(tasksRef, taskId);
      remove(taskRef).then(resolve).catch(reject);
    });
  };

  return (
    <div>
      <h1>Scrum Board</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <TaskForm addTask={addTask} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TaskList
          tasks={tasks}
          status="to do"
          markTaskAsInProgress={markTaskAsInProgress}
          markTaskAsDone={markTaskAsDone}
          removeTask={removeTask}
        />
        <TaskList
          tasks={tasks}
          status="in progress"
          markTaskAsInProgress={markTaskAsInProgress}
          markTaskAsDone={markTaskAsDone}
          removeTask={removeTask}
        />
        <TaskList
          tasks={tasks}
          status="done"
          markTaskAsInProgress={markTaskAsInProgress}
          markTaskAsDone={markTaskAsDone}
          removeTask={removeTask}
        />
      </div>
    </div>
  );
};

export default App;
