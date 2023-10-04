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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <h1 className="mb-4">Journal Entries</h1>
          {journalEntries.map((entry) => (
            <div className="card mb-3" key={entry.id}>
              <div className="card-body">
                <p className="card-text">{entry.prompt.prompt}</p>
                <p className="card-text">{entry.journalEntry}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalComponent;
