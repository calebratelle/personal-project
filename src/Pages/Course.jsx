import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import JournalEntry from "../Elements/JournalEntry";

const Course = () => {
  const { id, lessonid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

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
  };

  console.log(currentLesson);
  useEffect(() => {
    getCourseContent();
    console.log("HITTTTT", localStorage.route);
    id && lessonid && localStorage.setItem("route", pathname);
  }, [id]);

  const generateStyledText = (str) => {
    return str.split("\n").map((sentence, index) => {
      return <p key={index}>{sentence}</p>;
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <p className="list-group-item list-group-item-primary">Lessons</p>
            {courseContent.lessons &&
              courseContent.lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  className={`btn btn-primary list-group-item list-group-item-action ${
                    lesson.id === currentLesson.id ? "active" : ""
                  }`}
                  style={{ marginBottom: "5px"}}
                  onClick={() => {
                    navigate(`/course/${id}/${index}`);
                    setCurrentLesson(lesson);
                    localStorage.setItem("route", `/course/${id}/${index}`);
                  }}
                >
                  {lesson.lessonName}
                </button>
              ))}
          </div>
        </div>

        <div className="col-md-9">
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
      </div>
    </div>
  );
};

export default Course;
