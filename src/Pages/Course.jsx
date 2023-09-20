import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Course = () => {
  const { id } = useParams();

  const [courseContent, setCourseContent] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentDay, setCurrentDay] = useState(0)

  useEffect(() => {
    const apiUrl = `http://localhost:2319/api/course/${id}`;

    axios
      .get(apiUrl)
      .then((res) => {
        setCourseContent(res.data);
        setCurrentLesson(res.data.lessons[0])
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div>
      {courseContent ? (
        <div>
          <h1>{currentLesson.lessonName}</h1>
          {currentLesson.lesson_parts.map((part, lessonPartId) => (
            <div key={lessonPartId}>
              <h2>{part.partTitle}</h2>
              <h4>{part.partContent}</h4>
              {part.prompts &&
                part.prompts.map((prompt, promptOrder) => (
                  <div key={promptOrder}>
                    <h4>{prompt.prompt}</h4>
                    <textarea
                    style={{ width: '90%', height: '80px' }}/>
                  </div>
                ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading course content...</p>
      )}
    </div>
  );
  
  
};

export default Course;

//access the id off ouf the routing params (react routing params)
//with that id, make an axios request when the component first renders using that course id to the endpoint in the index.js
//with that response, save the array of data on a state value (nested)
