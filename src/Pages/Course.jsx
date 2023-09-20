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
          <h4>{currentLesson.lesson_parts[0].partContent}</h4>
          <h2>{currentLesson.lesson_parts[1].partTitle}</h2>
          <h4>{currentLesson.lesson_parts[1].partContent}</h4>
          <h2>{currentLesson.lesson_parts[2].partTitle}</h2>
          <h4>{currentLesson.lesson_parts[2].partContent}</h4>
          <h2>{currentLesson.lesson_parts[3].partTitle}</h2>
          <h4>{currentLesson.lesson_parts[3].partContent}</h4>
          <h4>{currentLesson.lesson_parts[3].prompts[0].prompt}</h4>
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
