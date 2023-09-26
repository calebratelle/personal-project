import { User, Journal, Prompt } from "../model.js";

export default {
  postJournal: async (req, res) => {
    console.log("Post Journal");
    try {
      const { userId, promptId, journalEntry } = req.body;

      // Check if the user with the given userId exists
      const user = await User.findOne({ where: { userId } });

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      // Check if the prompt with the given promptId exists
      const prompt = await Prompt.findOne({ where: { promptId } });

      if (!prompt) {
        return res.status(404).json({ error: "Prompt not found." });
      }

      // Create a new journal entry in the database
      const newJournalEntry = await Journal.create({
        userId,
        promptId,
        journalEntry,
      });

      return res.status(200).json(newJournalEntry);
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
      });

      // Send the journalData as a response
      res.status(200).json(journalData);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something ain't right");
    }
  },
};
