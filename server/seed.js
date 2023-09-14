//This file is the connection between the sourse-one.json file and the actual DB.  It tells each part of the json file where to go on the DB tables.

import connectToDB from "./db.js";
import { User, Lesson, Journal, LessonPart, Prompt, Course } from "./model.js";
import courseOne from "./course-data/course-one.json" assert { type: "json" };

console.log(courseOne);
const db = await connectToDB("postgresql:///personal-project");

await db.sync().then(async () => {
  let newCourse = await Course.create({
    courseTitle: "Course 1: The Foundation",
  });
  courseOne.forEach(async (lesson, index) => {
    let newLesson = await Lesson.create({
      lessonName: lesson.title,
      lessonDay: index,
      courseId: newCourse.courseId,
    });

    lesson.parts.forEach(async (part, partIndex) => {
      let newPart = await LessonPart.create({
        partOrder: partIndex+1,
        partContent: part.content,
        partTitle: part.title,
        lessonId: newLesson.lessonId,
      });

      part.prompts.forEach(async (prompt, promptIndex) => {
        await Prompt.create({
          promptOrder: promptIndex+1,
          prompt: prompt,
          lessonPartId: newPart.lessonPartId,
        });
      });
    });
  });
});
console.log("seeded database");
db.close();



