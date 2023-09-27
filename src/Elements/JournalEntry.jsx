import React, {useState} from "react";
import { useSelector } from "react-redux";
import axios from "axios";

//update the journal so that upon "submit", that journal entry with that specific prompt ID updates in the DB instead of adding a new row.
//update this file so that journal entry text boxes autopopulate with the saved data from the DB
//update Journal.jsx so that journal entries are presented with their respective prompts.

const JournalEntry = ({ prompt, getCourseContent }) => {
  const [userResponses, setUserResponses] = useState(prompt.journals[0] ? prompt.journals[0].journalEntry : '');
  const userId = useSelector(state => state.userId)

  const handleResponseChange = (e) => {
    setUserResponses(e.target.value);
  };

  const handleSubmit = () => {
    const promptId = prompt.promptId;


    axios.post("/api/postjournal", { userId, promptId, journalEntry: userResponses }).then((response) => {
      console.log(response.status, response.data.token);
    getCourseContent()});

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
