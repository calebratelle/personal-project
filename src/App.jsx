import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Elements/Header";
import Course from "./Pages/Course";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Journal from "./Pages/Journal";
import { Routes, Route, useLocation, Navigate} from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function App() {
  const userId = useSelector(state => state.userId)
  const [selectedCourse, setSelectedCourse] = useState({
    title: 'Course I: The Foundation',
    id: 1,
  });

  const handleCourseSelection = (newCourse) => {
    setSelectedCourse(newCourse);
  };

  const location = useLocation();
  const renderHeader = location.pathname !== "/";

  const fetchCourseData = () => {
    console.log('fetch course data');
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
  }, [selectedCourse.id]); 

  return (
    <>
      {renderHeader && <Header currentCourse={selectedCourse} />}
      <Routes>
        <Route index element={userId ? <Navigate to='/home' /> : <Login />} />
        <Route
          path="/home"
          element={userId ? <Home handleCourseSelection={handleCourseSelection}/> : <Navigate to='/'/>}
        />
        <Route path="/course/:id" element={userId ? <Course /> : <Navigate to='/'/>} />
        <Route path="/journal" element={userId ? <Journal /> : <Navigate to='/'/>} />
      </Routes>
    </>
  );
}

export default App;
