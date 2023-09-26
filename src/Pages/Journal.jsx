import React, { useEffect, useState } from "react";
import axios from "axios";

const JournalComponent = () => {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    axios
      .get('/api/journal')
      .then((res) => {
        setJournalEntries(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
  
        <div>
          {journalEntries.map((entry) => (
            <div key={entry.id}>
              {entry.journalEntry}
            </div>
          ))}
        </div>
      
  );
};

export default JournalComponent;