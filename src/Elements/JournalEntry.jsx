import React, { useState } from "react";

const JournalEntry = ({ prompt }) => {
  const [userResponses, setUserResponses] = useState("");

  const handleResponseChange = (e) => {
    setUserResponses(e.target.value);
  };

  const handleSubmit = () => {
    // Send the responses to a server.
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
