import React from 'react';

const Home = ({ handleCourseSelection }) => {
  const selectCourse = (courseName) => {
    handleCourseSelection(courseName);
  };

  return (
    <div>
      <button onClick={() => selectCourse({title: 'Course I: The Foundation', id: 1})}>Course I: The Foundation</button>
      <button onClick={() => selectCourse({title: 'Course II: Progression Principles', id: 2})}>Course II: Progression Principles</button>
      <button onClick={() => selectCourse({title: 'Course III: Trauma Resolution', id: 3})}>Course III: Trauma Resolution</button>
    </div>
  );
}

export default Home;
