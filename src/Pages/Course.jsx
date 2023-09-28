import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import JournalEntry from "../Elements/JournalEntry";

const Course = () => {
  const { id, lessonid} = useParams();

  const navigate = useNavigate()

  const [courseContent, setCourseContent] = useState({});
  const [currentLesson, setCurrentLesson] = useState({});

  const getCourseContent = () => {
    axios
      .get(`/api/course/${id}`)
      .then((res) => {
        setCourseContent(res.data);
        setCurrentLesson(res.data.lessons[lessonid] || {});
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  }

  console.log(currentLesson)
  useEffect(() => {
   
    getCourseContent()}, [id]);

  const generateStyledText = (str) => {
    return str.split("\n").map((sentence, index) => {
      return <p key={index}>{sentence}</p>;
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div>
        <p></p>
        {courseContent.lessons &&
          courseContent.lessons.map((lesson, index) => (
            <button key={lesson.id} onClick={() => {
            navigate(`/course/${id}/${index}`)
            setCurrentLesson(lesson)
            }}>
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
                <div>
                  {part.partContent && generateStyledText(part.partContent)}
                </div>
                {part.prompts &&
                  part.prompts.map((prompt) => (
                    <JournalEntry
                      key={prompt.promptId}
                      prompt={prompt}
                      getCourseContent={getCourseContent}
                    />
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
