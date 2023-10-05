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
      .catch((err) => console.error("Error fetching user data:", err));
  }, [dispatch]);

  const navLinkStyle = {
    marginRight: "20px",
  };

  const headerStyle = {
    backgroundColor: "#cfe2ff",
    borderBottom: "2px solid #ddd",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "15px 0",
    color: "#f5f5f5",
  };

  const navLinkActiveStyle = {
    color: "#ff3366",
  };

  const handleLogout = () => {
    axios
      .delete("/api/logout")
      .then(() => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("route");
      })
      .catch((err) => console.error("Error logging out:", err));
  };

  return (
    <>
      {userId ? (
        <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={headerStyle}>
          <div className="container">
            <NavLink className="navbar-brand" to="/home">
              Courses
            </NavLink>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/course/${currentCourse.id}/0`} activeStyle={navLinkActiveStyle}>
                    {currentCourse.title}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/journal" activeStyle={navLinkActiveStyle}>
                    Personal Journal
                  </NavLink>
                </li>
              </ul>
            </div>
            <button className="btn btn-outline-secondary my-2 my-sm-0" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default Header;
