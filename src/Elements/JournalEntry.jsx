import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const JournalEntry = ({ prompt, getCourseContent }) => {
  const [userResponses, setUserResponses] = useState(
    prompt.journals[0] ? prompt.journals[0].journalEntry : ""
  );
  const userId = useSelector((state) => state.userId);

  const handleResponseChange = (e) => {
    setUserResponses(e.target.value);
  };

  const handleSubmit = () => {
    const promptId = prompt.promptId;
    axios
      .post("/api/postjournal", {
        userId,
        promptId,
        journalEntry: userResponses,
      })
      .then((response) => {
        console.log(response.status, response.data.token);
        getCourseContent();
      });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-text">{prompt.prompt}</p>
        <textarea
          className="form-control mb-2"
          style={{ width: "100%", height: "80px" }}
          value={userResponses}
          onChange={handleResponseChange}
        />
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default JournalEntry;
