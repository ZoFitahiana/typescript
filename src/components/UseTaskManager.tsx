import { useState } from "react";
import { nanoid } from "nanoid";

interface Task {
  id: string;
  title: string;
}

interface TaskManagerHook {
  tasks: Task[];
  title: string;
  searchKeyword: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  addTask: () => void;
  completeTask: (id: string) => void;
  updateTask: (id: string, taskUpdate: Partial<Task>) => void;
  filteredTasks: Task[];
}

const useTaskManager = (): TaskManagerHook => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const completeTask = (id: string): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>): void => {
    const newTasks = tasks.slice();
    const index = tasks.findIndex((task) => task.id === id);
    newTasks[index] = { ...newTasks[index], ...taskUpdate };
    setTasks(newTasks);
  };

  const addTask = (): void => {
    if (title.length < 1) {
      return;
    }

    const newTask = {
      id: nanoid(),
      title,
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle("");
  };

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    tasks,
    title,
    searchKeyword,
    setTitle,
    setSearchKeyword,
    addTask,
    completeTask,
    updateTask,
    filteredTasks,
  };
};

export default useTaskManager;
