import React from "react";
import { NavLink } from "react-router-dom";

const Home = ({ handleCourseSelection }) => {
  const selectCourse = (courseName) => {
    handleCourseSelection(courseName);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <NavLink to="/course/1/0" activeClassName="active">
                <button
                  className="btn btn-primary mb-3"
                  onClick={() =>
                    selectCourse({ title: "Course I: The Foundation", id: 1 })
                  }
                >
                  Course I: The Foundation
                </button>
              </NavLink>
              <NavLink to="/course/2/0" activeClassName="active">
                <button
                  className="btn btn-primary mb-3"
                  onClick={() =>
                    selectCourse({
                      title: "Course II: Progression Principles",
                      id: 2,
                    })
                  }
                >
                  Course II: Progression Principles
                </button>
              </NavLink>
              <NavLink to="/course/3/0" activeClassName="active">
                <button
                  className="btn btn-primary mb-3"
                  onClick={() =>
                    selectCourse({
                      title: "Course III: Trauma Resolution",
                      id: 3,
                    })
                  }
                >
                  Course III: Trauma Resolution
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
