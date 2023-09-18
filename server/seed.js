//This file is the connection between the sourse-one.json file and the actual DB.  It tells each part of the json file where to go on the DB tables.

import connectToDB from "./db.js";
import { User, Lesson, Journal, LessonPart, Prompt, Course } from "./model.js";
import courseOne from "./course-data/course-one.json" assert { type: "json" };
import courseTwo from "./course-data/course-two.json" assert { type: "json" };
import courseThree from "./course-data/course-three.json" assert { type: "json" };


const seedDatabase = async () => {
  try {
    const db = await connectToDB("postgresql:///personal-project");
    await db.sync();

    const courses = [
      { title: "Course 1: The Foundation", data: courseOne },
      { title: "Course 2: Progression Principles", data: courseTwo },
      { title: "Course 3: Trauma Resolution", data: courseThree },
    ];

    for (const courseData of courses) {
      const { title, data: lessonsData } = courseData;
      const newCourse = await Course.create({
        courseTitle: title,
      });
      
      lessonsData.forEach(async (lesson, index) => {
        console.log(newCourse.courseId)
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
          })
        })
      })
    }

    console.log("Seeded database");
    db.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
