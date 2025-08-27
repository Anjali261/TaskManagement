import React, { useEffect, useState } from "react";
import api from "../api/axios"; 
import type { Task } from "../types";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;


  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/task"); 
      setTasks(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);



  return (
    <div className="p-6 max-w-4xl mx-auto">
<header className="relative flex items-center mb-6 h-12">
  <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl  font-extrabold underline text-orange-900  ">
    All Tasks
  </h1>

</header>

      {loading ? (
        <div>Loading...</div>
      ) : tasks.length === 0 ? (
        <div className="text-gray-600">No tasks found</div>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-white p-9 rounded shadow flex justify-between"
            >
              <div>
                <h3 className="font-bold text-xl mb-2">{task.title}</h3>
                <p className="text-l mb-2">{task.description}</p>
                <p className="text-xs text-gray-500">
  By: {typeof task.user === "string" ? "Unknown" : task.user.name} | Status: {task.status} | 
</p>
              </div>
              <span className="text-xs text-gray-400">
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleString()
                  : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
