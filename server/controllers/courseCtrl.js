
import { Lesson, LessonPart, Prompt, Course } from "../model.js"; // Import your models

export default {
  getCourse: async (req, res) => {
    try {
      console.log("show all lessons with their parts and prompts");
      const courseId = req.params.courseId;

      const courseData = await Course.findOne({
        where: { courseId },
        include: [
          {
            model: Lesson,
            include: [
              {
                model: LessonPart,
                include: [
                  {
                    model: Prompt,
                  },
                ],
              },
            ],
          },
        ],
        order: [
          [Lesson, 'lessonId', 'ASC'],
          [Lesson, LessonPart, 'lessonPartId', 'ASC'],
          [Lesson, LessonPart, Prompt, 'promptId', 'ASC'],
        ],
      });
      
      

      // Send the courseData as a response
      res.status(200).json(courseData);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something ain't right");
    }
  },
};
