import Question from '../models/Questions';

class questionsController {
    static async getAllQuestions(req, res) {
        try {
            const questions = await Question.find();
            return res.status(200).json(questions);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async getQuestion(req, res) {
        try {
            const question = await Question.findById(req.params.id);
            return res.status(200).json(question);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async postQuestion(req, res) {
        const { title, description } = req.body;
        try {
            const newQuestion = await Question.create({
                title,
                description,
                userId: '62ea7b587ad4dd1b0e04863e',
            });
            return res.status(201).json(newQuestion);
        } catch (err) {
            return res.status(400).json(err.message);
        }
    }

    static async updateQuestion(req, res) {
        const { title, description, preferedAnswer } = req.body;
        const dateUpdated = Date.now();
        try {
            const question = await Question.findByIdAndUpdate(
                req.params.id,
                { $set: { title, description, dateUpdated, preferedAnswer } },
                { new: true }
            );
            return res.status(201).json(question);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async deleteQuestion(req, res) {
        try {
            const question = await Question.deleteOne({ _id: req.params.id });
            return res
                .status(200)
                .json({ message: 'Question Deleted', question });
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }
}

export default questionsController;
