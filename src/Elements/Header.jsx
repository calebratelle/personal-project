import React from 'react'
import { NavLink } from "react-router-dom"

const Header = ({currentCourse}) => {
  return (
    <div>
        <NavLink to = '/home'>Home</NavLink>
        <NavLink to = '/course'>{currentCourse}</NavLink>
        <NavLink to = '/journal'>Journal</NavLink>
        <NavLink to = '/'>Logout</NavLink>
    </div>
  )
}

export default Header