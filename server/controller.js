//instructions: create a get request that includes lesson, lesson parts, and prompts all included in the object
import { Lesson, LessonPart, Prompt, Course } from "./model.js"; // Import your models

export default {
  getCourse: async (req, res) => {
    try {
      console.log("show all lessons with their parts and prompts");
      let courseData = await Course.findOne({
        where: { courseId: 1 },
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
      });

      // Send the courseData as a response
      res.status(200).json(courseData);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something ain't right");
    }
  },
};
