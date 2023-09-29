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

  const handleLogout = () => {
    axios.delete("/api/logout").then((res) => dispatch({ type: "LOGOUT" }));
    localStorage.removeItem('route')
  };

  return (
    <>
      {userId ? (
        <nav>
          <NavLink to="/home" style={navLinkStyle}>
            All Courses
          </NavLink>
          <NavLink to={`/course/${currentCourse.id}/0`} style={navLinkStyle}>
            {currentCourse.title}
          </NavLink>
          <NavLink to="/journal" style={navLinkStyle}>
            Journal
          </NavLink>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      ) : null}
    </>
  );
};

export default Header;
