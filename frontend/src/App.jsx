import React from "react";
import StudentList from "./components/StudentList";
import { Toaster } from "react-hot-toast";
import "./index.css";
function App() {
  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Student Management System
      </h1>

      <StudentList />
    </div>
  );
}

export default App;
