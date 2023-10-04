import { User, Journal, Prompt, LessonPart, Lesson, Course } from "../model.js";

export default {
  postJournal: async (req, res) => {
    console.log("Post Journal");
    try {
      const { userId, promptId, journalEntry } = req.body;

      const user = await User.findOne({ where: { userId } });

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      const prompt = await Prompt.findOne({ where: { promptId } });

      if (!prompt) {
        return res.status(404).json({ error: "Prompt not found." });
      }

      const existingJournalEntry = await Journal.findOne({
        where: { userId, promptId },
      });

      if (existingJournalEntry) {
        existingJournalEntry.journalEntry = journalEntry;
        await existingJournalEntry.save();
        return res.status(200).json(existingJournalEntry);
      } else {
        const newJournalEntry = await Journal.create({
          userId,
          promptId,
          journalEntry,
        });
        return res.status(200).json(newJournalEntry);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getJournals: async (req, res) => {
    try {
      console.log("show all journals with their prompts");
      const userId = req.session.user.userId;
      const journalData = await Journal.findAll({
        where: { userId },
        include: [
          {
            model: Prompt,
            include: [
              {
                model: LessonPart,
                include: [
                  {
                    model: Lesson,
                    include: [
                      {
                        model: Course,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        order: [
          [Prompt, 'promptId', 'ASC']
        ],
      });
      res.status(200).json(journalData);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something ain't right");
    }
  },
};
