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
    <div>
      <p>{prompt.prompt}</p>
      <textarea
        style={{ width: "90%", height: "80px" }}
        value={userResponses}
        onChange={handleResponseChange}
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default JournalEntry;
