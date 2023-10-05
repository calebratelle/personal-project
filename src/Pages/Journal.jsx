import React, { useEffect, useState } from "react";
import axios from "axios";

const JournalComponent = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(""); 

  useEffect(() => {
    axios
      .get(`/api/journal?course=${selectedCourse}`) 
      .then((res) => {
        setJournalEntries(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedCourse]);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-9">
          <h1 className="mb-4">Personal Journal</h1>
          {journalEntries.filter((entry) => selectedCourse === "" || entry.prompt.lesson_part.lesson.course.courseId=== +selectedCourse).map((entry) => (
            <div className="card mb-3" key={entry.id}>
              <div className="card-body">
                <p className="card-text"><em>{entry.prompt.prompt}</em></p>
                <p className="card-text">{entry.journalEntry}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="courseSelect">Select a Course:</label>
            <select
              id="courseSelect"
              className="form-control"
              value={selectedCourse}
              onChange={handleCourseChange}
            >
              <option value="">All Courses</option>
              <option value="1">Course I: The Foundation</option>
              <option value="2">Course II: Progression Principles</option>
              <option value="3">Course III: Trauma Resolution</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalComponent;
