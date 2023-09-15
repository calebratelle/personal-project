import React from 'react';

const Home = ({ handleCourseSelection }) => {
  const selectCourse = (courseName) => {
    handleCourseSelection(courseName);
  };

  return (
    <div>
      <button onClick={() => selectCourse('Course I: The Foundation')}>Course I: The Foundation</button>
      <button onClick={() => selectCourse('Course II: Progression Principles')}>Course II: Progression Principles</button>
      <button onClick={() => selectCourse('Course III: Trauma Resolution')}>Course III: Trauma Resolution</button>
      <button onClick={() => selectCourse('Course IV: Progression Principles')}>Course IV: Progression Principles</button>
    </div>
  );
}

export default Home;