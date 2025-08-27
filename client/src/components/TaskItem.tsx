import React, { useState } from "react";
import api from "../api/axios";
import type { Task } from "../types";

export default function TaskItem({
  task,
  onUpdate,
  onDelete,
}: {
  task: Task;
  onUpdate: (t: Task) => void;
  onDelete: (id?: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);
    try {
      const { data } = await api.put(`/task/${task._id}`, {
        title,
        description,
        status: task.status,
      });
      onUpdate(data);
      setEditing(false);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    try {
      const { data } = await api.delete(`/task/${task._id}`);
      onDelete(task._id);
      alert(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async () => {
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    try {
      const { data } = await api.put(`/task/${task._id}`, {
        status: newStatus,
      });
      onUpdate(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-3 rounded shadow flex items-start justify-between">
      <div className="flex-1">
        {editing ? (
          <div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-1 border rounded mb-1"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-1 border rounded"
            />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2">
              <h3
                className={`font-semibold ${
                  task.status === "Completed"
                    ? "line-through text-gray-500"
                    : ""
                }`}
              >
                {task.title}
              </h3>
              <span className="text-xs text-gray-500">
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleString()
                  : ""}
              </span>
            </div>
            <p
              className={`text-sm ${
                task.status === "Completed" ? "text-gray-500" : ""
              }`}
            >
              {task.description}
            </p>
          </div>
        )}
      </div>

      <div className="ml-4 flex flex-col gap-2">
        <button
          onClick={toggleStatus}
          className="px-2 py-1 border rounded text-sm"
        >
          {task.status === "Completed" ? "Mark Pending" : "Mark Completed"}
        </button>
        {editing ? (
          <div className="flex gap-2">
            <button
              disabled={loading}
              onClick={save}
              className="px-2 py-1 bg-green-600 text-white rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-2 py-1 border rounded text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="px-2 py-1 border rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={remove}
              className="px-2 py-1 border rounded text-sm"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
