import React from "react";
import { NavLink } from "react-router-dom";

const Home = ({ handleCourseSelection }) => {
  const selectCourse = (courseName) => {
    handleCourseSelection(courseName);
  };

  return (
    <div>
      <NavLink to="/course/1" activeClassName="active">
        <button
          onClick={() =>
            selectCourse({ title: "Course I: The Foundation", id: 1 })
          }
        >
          Course I: The Foundation
        </button>
      </NavLink>
      <NavLink to="/course/2" activeClassName="active">
        <button
          onClick={() =>
            selectCourse({ title: "Course II: Progression Principles", id: 2 })
          }
        >
          Course II: Progression Principles
        </button>
      </NavLink>
      <NavLink to="/course/3" activeClassName="active">
        <button
          onClick={() =>
            selectCourse({ title: "Course III: Trauma Resolution", id: 3 })
          }
        >
          Course III: Trauma Resolution
        </button>
      </NavLink>
    </div>
  );
};

export default Home;

