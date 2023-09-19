import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Elements/Header";
import Course from "./Pages/Course";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Journal from "./Pages/Journal";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

function App() {
  const [selectedCourse, setSelectedCourse] = useState({
    title: 'Course I: The Foundation',
    id: 1,
  });

  const handleCourseSelection = (newCourse) => {
    setSelectedCourse(newCourse);
  };

  const location = useLocation();
  const renderHeader = location.pathname !== "/";

  // Function to fetch course data using the selected course ID
  const fetchCourseData = () => {
    console.log('fetch course data');
    axios
      .get(`/api/course/${selectedCourse.id}`) // Use the correct ID here
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Use useEffect to fetch data when the selectedCourse changes
  useEffect(() => {
    fetchCourseData();
  }, [selectedCourse.id]); // Add selectedCourse.id to the dependencies array

  return (
    <>
      {renderHeader && <Header currentCourse={selectedCourse.title} />}
      <Routes>
        <Route index element={<Login />} />
        <Route
          path="/home"
          element={<Home handleCourseSelection={handleCourseSelection} />}
        />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </>
  );
}

export default App;
