import { User } from "../model.js";
import bcrypt from "bcryptjs";

export default {
  register: async (req, res) => {
    console.log("register");
    try {
      const { username, password } = req.body;

      const foundUser = await User.findOne({ where: { username } });

      if (foundUser) {
        return res
          .status(400)
          .json({ error: "That username is already taken." });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = await User.create({ username, hashedPass: hash });

      req.session.user = {
        userId: newUser.userId,
        username: newUser.username,
      };

      return res.status(200).json(req.session.user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    console.log("login");
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      const isAuthenticated = bcrypt.compareSync(password, user.hashedPass);

      if (!isAuthenticated) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      req.session.user = {
        userId: user.userId,
        username: user.username,
      };

      return res.status(200).json(req.session.user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  checkUser: async (req, res) => {
    console.log("checkUser");
    try {
      if (req.session.user) {
        return res.status(200).json(req.session.user);
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  logout: async (req, res) => {
    console.log("logout");
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        } else {
          return res.status(200).json({ message: "Logout successful" });
        }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
