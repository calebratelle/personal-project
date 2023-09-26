import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const JournalEntry = ({ prompt }) => {
  const [userResponses, setUserResponses] = useState("");
  const userId = useSelector(state => state.userId)

  const handleResponseChange = (e) => {
    setUserResponses(e.target.value);
  };

  const handleSubmit = () => {
    const promptId = prompt.promptId;

    // postJournal({ userId, promptId, journalEntry: userResponses }); //axios request to send the info to the backend

    axios.post("/api/postjournal", { userId, promptId, journalEntry: userResponses }).then((response) => {
      console.log(response.status, response.data.token);
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
