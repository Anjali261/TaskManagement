import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import TasksPage from './pages/TaskPage'
import type { JSX } from 'react/jsx-runtime'
import HomePage from './pages/HomePage'


const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
const token = localStorage.getItem('token')
if (!token) return <Navigate to="/login" replace />
return children
}


export default function App() {
return (
<div className="min-h-screen bg-gray-100">
<Routes>
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

<Route
path="/"
element={
<ProtectedRoute>
<TasksPage />
</ProtectedRoute>
}
/>
<Route
    path="/tasks"
    element={
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    }
  />
</Routes>
</div>
)
}