import React from "react";
import useTaskManager from "./UseTaskManager";
import "./TaskManager.css";

export const TaskManager: React.FC = () => {
  const {
    title,
    searchKeyword,
    setTitle,
    setSearchKeyword,
    addTask,
    completeTask,
    updateTask,
    filteredTasks,
  } = useTaskManager();

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          onChange={(ev) => setSearchKeyword(ev.target.value)}
          placeholder="Search Task"
        />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) => updateTask(task.id, { title: e.target.value })}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
