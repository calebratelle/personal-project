import React, { useEffect, useState } from "react";
import axios from "axios";

const JournalComponent = () => {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    axios
      .get('/api/journal')
      .then((res) => {
        setJournalEntries(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
  
        <div>
          {journalEntries.map((entry) => (
            <div key={entry.id}>
              <p>{entry.prompt.prompt}</p>
              {entry.journalEntry}
            </div>
          ))}
        </div>
      
  );
};

export default JournalComponent;