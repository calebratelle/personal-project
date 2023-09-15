//This file is the connection between the sourse-one.json file and the actual DB.  It tells each part of the json file where to go on the DB tables.

import connectToDB from "./db.js";
import { User, Lesson, Journal, LessonPart, Prompt, Course } from "./model.js";
import courseOne from "./course-data/course-one.json" assert { type: "json" };
import courseTwo from "./course-data/course-two.json" assert { type: "json" };
import courseThree from "./course-data/course-three.json" assert { type: "json" };
import courseFour from "./course-data/course-four.json" assert { type: "json" };


const seedDatabase = async () => {
  try {
    const db = await connectToDB("postgresql:///personal-project");
    await db.sync();

    const courses = [
      { title: "Course 1: The Foundation", data: courseOne },
      { title: "Course 2: Progression Principles", data: courseTwo },
      { title: "Course 3: Trauma Resolution", data: courseThree },
      { title: "Course 4: Progression Principles", data: courseFour },
    ];

    for (const courseData of courses) {
      const { title, data: lessonsData } = courseData;
      const newCourse = await Course.create({
        courseTitle: title,
      });

      for (const lessonData of lessonsData) {
        const { title: lessonTitle, parts } = lessonData;
        const newLesson = await Lesson.create({
          lessonName: lessonTitle,
          courseId: newCourse.courseId,
        });

        for (const partData of parts) {
          const { order, content, title: partTitle, prompts } = partData;
          const newPart = await LessonPart.create({
            partOrder: order,
            partContent: content,
            partTitle: partTitle,
            lessonId: newLesson.lessonId,
          });

          for (const promptData of prompts) {
            const { order: promptOrder, prompt } = promptData;
            await Prompt.create({
              promptOrder: promptOrder,
              prompt: prompt,
              lessonPartId: newPart.lessonPartId,
            });
          }
        }
      }
    }

    console.log("Seeded database");
    db.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
