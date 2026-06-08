import React, { useEffect } from "react";
import axios from "axios";
import StudentList from "./components/StudentList";
import { Toaster } from "react-hot-toast";
import "./index.css";

function App() {

  useEffect(() => {
    axios.get(
      "https://student-management-system-v7q0.onrender.com/api/students"
    );
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Student Management System
      </h1>

      <StudentList />

      <Toaster position="top-right" />
    </div>
  );
}

export default App;