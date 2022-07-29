const express = require('express');
const Answer = require('../models/Answers');
const Question = require('../models/Questions');

class answersController {
  static async getAllAnswers(req, res) {}

  static async getAnswer(req, res) {}

  static async postAnswer(req, res) {
    const { answer, votes } = req.body;

    const newAnswer = new Answer({
      answer,
      votes,
      question_id: req.params.id,
      user_id: req.user.Id,
    });
    try {
      const savedAnswer = await newAnswer.save();
      return res.status(201).json(savedAnswer);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  static async updateAnswer(req, res) {}

  static async deleteAnswer(req, res) {}

  static async preferAnswer(req, res) {}
}

module.exports = answersController;
