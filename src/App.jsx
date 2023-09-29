import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Elements/Header";
import Course from "./Pages/Course";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Journal from "./Pages/Journal";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function App() {
  const userId = useSelector((state) => state.userId);
  const [selectedCourse, setSelectedCourse] = useState({
    title: "Course I: The Foundation",
    id: 1,
  });

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleCourseSelection = (newCourse) => {
    setSelectedCourse(newCourse);
  };

  const location = useLocation();
  const renderHeader = location.pathname !== "/";

  const fetchCourseData = () => {
    console.log("fetch course data");
    axios
      .get(`/api/course/${selectedCourse.id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCourseData();
    localStorage.route ? navigate(localStorage.route) : null
  }, [selectedCourse.id]);

  console.log(pathname);

  return (
    <>
      {renderHeader && <Header currentCourse={selectedCourse} />}
      <Routes>
        <Route
          path="/"
          element={userId ? localStorage.route ? <Navigate to={localStorage.route} /> : <Navigate to = '/home' /> : <Login />}
        />
        <Route
          path="/home"
          element={
            userId ? (
              <Home handleCourseSelection={handleCourseSelection} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/course/:id/:lessonid"
          element={userId ? <Course /> : <Navigate to="/" />}
        />
        <Route
          path="/journal"
          element={userId ? <Journal /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
