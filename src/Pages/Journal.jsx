import React, { useEffect, useState } from "react";
import axios from "axios";

const JournalComponent = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(""); // State to store the selected course

  useEffect(() => {
    axios
      .get(`/api/journal?course=${selectedCourse}`) // Filter journal entries by the selected course
      .then((res) => {
        setJournalEntries(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedCourse]);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value); // Update the selected course when the dropdown changes
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-9">
          <h1 className="mb-4">Journal Entries</h1>
          {journalEntries.filter((entry) => selectedCourse === "" || entry.prompt.lesson_part.lesson.course.courseId=== +selectedCourse).map((entry) => (
            <div className="card mb-3" key={entry.id}>
              <div className="card-body">
                <p className="card-text">{entry.prompt.prompt}</p>
                <p className="card-text">{entry.journalEntry}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-3">
          {/* Dropdown menu for selecting courses */}
          <div className="form-group">
            <label htmlFor="courseSelect">Select a Course:</label>
            <select
              id="courseSelect"
              className="form-control"
              value={selectedCourse}
              onChange={handleCourseChange}
            >
              <option value="">All Courses</option>
              <option value="1">Course I</option>
              <option value="2">Course II</option>
              <option value="3">Course III</option>
              {/* Add more options for other courses */}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalComponent;
