import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Course = () => {
  const { id } = useParams();

  const [courseContent, setCourseContent] = useState({});
  const [currentLesson, setCurrentLesson] = useState({});

  useEffect(() => {
    const apiUrl = `http://localhost:2319/api/course/${id}`;

    axios
      .get(apiUrl)
      .then((res) => {
        setCourseContent(res.data);
        setCurrentLesson(res.data.lessons[0] || {});
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const generateStyledText = (str) => {
    return str.split("\n").map((sentence, index) => {
      return <p key={index}>{sentence}</p>;
    });
  };

  return (
    <div>
      <div>
        {courseContent.lessons &&
          courseContent.lessons.map((lesson) => (
            <button key={lesson.id} onClick={() => setCurrentLesson(lesson)}>
              {lesson.lessonName}
            </button>
          ))}
      </div>

      {currentLesson.lessonName ? (
        <div>
          <h1>{currentLesson.lessonName}</h1>
          {currentLesson.lesson_parts &&
            currentLesson.lesson_parts.map((part, lessonPartId) => (
              <div key={lessonPartId}>
                <h2>{part.partTitle}</h2>
                <p>
                  {part.partContent && generateStyledText(part.partContent)}
                </p>
                {part.prompts &&
                  part.prompts.map((prompt, promptOrder) => (
                    <div key={promptOrder}>
                      <p>{prompt.prompt}</p>
                      <textarea style={{ width: "100%", height: "80px" }} />
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
