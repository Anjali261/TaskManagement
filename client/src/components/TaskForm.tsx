import React, { useState } from "react";
import api from "../api/axios";
import type { Task } from "../types";

export default function TaskForm({
  onCreate,
}: {
  onCreate: (t: Task) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/task", { title, description });
      const created = data.task || data;
      onCreate(created);
      setTitle("");
      setDescription("");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <div className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="flex-1 p-2 border rounded"
        />
        <button
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Add
        </button>
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full mt-2 p-2 border rounded"
      />
    </form>
  );
}
