import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Header = ({ currentCourse }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => dispatch({ type: "LOGIN", payload: res.data.userId }))
      .catch((err) => console.log(err));
  }, [dispatch]);

  const navLinkStyle = {
    marginRight: "20px",
  };

  const headerStyle = {
    backgroundColor: "#c4c4c4",
    borderBottom: "2px solid #000000",
  };

  const handleLogout = () => {
    axios.delete("/api/logout").then((res) => dispatch({ type: "LOGOUT" }));
    localStorage.removeItem("route");
  };

  return (
    <>
      {userId ? (
        <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={headerStyle}>
          <div className="container">
            <NavLink className="nav-link" to="/home">
              All Courses
            </NavLink>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/course/${currentCourse.id}/0`}>
                    {currentCourse.title}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/journal">
                    Journal
                  </NavLink>
                </li>
              </ul>
            </div>
            <button className="btn btn-outline-danger my-2 my-sm-0" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default Header;
