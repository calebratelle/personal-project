import React, { useState } from "react";

const JournalEntry = ({ prompt }) => {
  const [userResponses, setUserResponses] = useState("");

  const handleResponseChange = (e) => {
    setUserResponses(e.target.value);
  };

  const handleSubmit = () => {
    const userId = user.userId; 
    const promptId = prompt.promptId; 

    postJournal({ userId, promptId, journalEntry: userResponses })  //axios request to send the info to the backend
      .then((response) => {
        console.log("Journal entry saved:", response);
      })
      .catch((err) => {
        console.error("Error saving journal entry:", err);
      });

    console.log("Submitted:", userResponses);
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
