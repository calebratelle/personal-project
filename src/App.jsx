import React, { useState } from "react";
import "./App.css";
import Header from "./Elements/Header";
import Course from "./Pages/Course";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Journal from "./Pages/Journal";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const [selectedCourse, setSelectedCourse] = useState(
    "Course I: The Foundation"
  );

  const handleCourseSelection = (newCourse) => {
    setSelectedCourse(newCourse);
  };

  const location = useLocation();

  const renderHeader = location.pathname !== "/";


  return (
    <>
      {renderHeader && <Header currentCourse={selectedCourse} />}
      <Routes>
        <Route index element={<Login />} />
        <Route
          path="/home"
          element={<Home handleCourseSelection={handleCourseSelection} />}
        />
        <Route path="/course" element={<Course />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </>
  );
}

export default App;
