import React from 'react'
import { NavLink } from "react-router-dom"

const Header = ({currentCourse}) => {
    const navLinkStyle = {
        marginRight: '20px', // Adjust the spacing as needed

      };

  return (
    <div>
        <NavLink to = '/home' style={navLinkStyle}>Home</NavLink>
        <NavLink to = '/course' style={navLinkStyle}>{currentCourse}</NavLink>
        <NavLink to = '/journal' style={navLinkStyle}>Journal</NavLink>
        <NavLink to = '/' style={navLinkStyle}>Logout</NavLink>
    </div>
  )
}

export default Header