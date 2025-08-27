import React, { useEffect, useState } from "react";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { clearToken } from "../utils/auth";
import type { Task } from "../types";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"All" | "Pending" | "Completed">("All");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/task");
      setTasks(data || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = (t: Task) => setTasks((prev) => [t, ...prev]);


  useEffect(() => {
    fetchTasks();
  }, [handleCreate]);


  const handleUpdate = async (updated: Task) => {
    try {
      const { data } = await api.put(`/task/${updated._id}`, updated);
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const filtered = tasks.filter((t) => {
    if (filter === "All") return true;
    return t.status === filter;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Tasks</h1>
        <div>
          <button
            onClick={() => {
              clearToken();
              location.href = "/login";
            }}
            className="px-3 py-1 border rounded mr-2"
          >
            Logout
          </button>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border p-1 rounded"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>
      </header>

      <TaskForm onCreate={handleCreate} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-4 space-y-3">
          {filtered.length === 0 && (
            <div className="text-gray-600">No tasks found</div>
          )}
          {filtered.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
