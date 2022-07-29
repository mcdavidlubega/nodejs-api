const Question = require('../models/Questions');

class questionsController {
  static async getAllQuestions(req, res) {
    try {
      const allQuestions = await Question.find();
      return res.status(200).json(allQuestions);
    } catch (err) {
      return res.status(401).json({ message: err });
    }
  }

  static async getQuestion(req, res) {
    try {
      const question = await Question.findById(req.params.id);
      return res.status(200).json(question);
    } catch (err) {
      return res.status(401).json({ message: err });
    }
  }

  static async postQuestion(req, res) {
    const { title, description, tag } = req.body;
    const question = new Question({
      title,
      description,
      tag,
      user_id: req.user.Id,
    });
    try {
      const newQuestion = await question.save();
      return res.status(201).json(newQuestion);
    } catch (err) {
      return res.status(401).json({ message: err });
    }
  }

  static async updateQuestion(req, res) {
    try {
      const { title, description, tag } = req.body;
      const question = await Question.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { title, description, tag } },
        { new: true }
      );
      return res.status(201).json(question);
    } catch (err) {
      return res.status(401).json({ message: err });
    }
  }

  static async deleteQuestion(req, res) {
    try {
      const question = await Question.deleteOne({ _id: req.params.id });
      return res.status(200).json(question);
    } catch (err) {
      return res.status(401).json({ message: err });
    }
  }
}

module.exports = questionsController;
