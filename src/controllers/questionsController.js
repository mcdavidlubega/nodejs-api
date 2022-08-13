import mongoose from 'mongoose';
import Question from '../models/Questions';
import Answer from '../models/Answers';
import Comment from '../models/Comments';

class questionsController {
    static async getAllQuestions(req, res) {
        try {
            const questions = await Question.find();
            if (questions.length < 1)
                return res
                    .status(200)
                    .json({ message: 'There are no questions' });
            return res.status(200).json(questions);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async searchQuestions(req, res) {
        try {
            const { search } = req.body;
            const searchResults = await Question.find({
                $text: {
                    $search: search,
                },
            });
            if (searchResults.length < 1)
                return res.status(401).json({ message: 'No questions found' });
            return res.status(200).json(searchResults);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async getQuestion(req, res) {
        const answers = await Answer.find({ questionId: req.params.id });
        try {
            const question = await Question.findById(req.params.id);
            return res
                .status(200)
                .json({ Question: question, Answers: answers });
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async getMostAnsweredQuestions(req, res) {
        try {
            const questions = await Answer.aggregate([
                // Grouping pipeline
                {
                    $group: {
                        _id: '$questionId',
                        answersCount: { $sum: 1 },
                    },
                },
                // Sorting pipeline
                { $sort: { answersCount: -1 } },
                // Optionally limit results
                { $limit: 5 },
            ]);
            return res.status(200).json(questions);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async postQuestion(req, res) {
        const { title, description } = req.body;
        const { userId } = req.user;

        try {
            const newQuestion = await Question.create({
                title,
                description,
                userId,
            });
            return res.status(201).json(newQuestion);
        } catch (err) {
            return res.status(400).json(err.message);
        }
    }

    static async updateQuestion(req, res) {
        const { title, description } = req.body;
        const dateUpdated = Date.now();
        const validatedpreferedAnswer = mongoose.Types.ObjectId.isValid(
            req.body.preferedAnswer
        );
        if (!validatedpreferedAnswer) {
            req.body.preferedAnswer = '';
        }
        const isAuthor = await Question.findOne({ _id: req.params.id });
        if (String(isAuthor.userId) !== req.user.userId)
            return res.status(401).json({ message: 'Not author' });
        try {
            const question = await Question.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        title,
                        description,
                        dateUpdated,
                        preferedAnswer: req.body.preferedAnswer,
                    },
                },
                { new: true }
            );
            return res.status(201).json(question);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async deleteQuestion(req, res) {
        const question = await Question.findOne({ _id: req.params.id });
        // console.log(String(question.userId));
        // console.log(req.user.userId);

        if (String(question.userId) !== req.user.userId)
            return res.status(401).json({ message: 'Not author' });
        try {
            const deltedQuestion = await Question.deleteOne({
                _id: req.params.id,
            });
            return res
                .status(200)
                .json({ message: 'Question deleted', deltedQuestion });
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async postAnswer(req, res) {
        const question = await Question.findOne({ _id: req.params.id });
        const { answer } = req.body;
        try {
            const newAnswer = await Answer.create({
                questionId: question._id,
                answer,
                userId: req.user.userId,
            });
            return res
                .status(201)
                .json({ Question: question.title, Answer: newAnswer });
        } catch (err) {
            return res.status(401).json({ message: err });
        }
    }

    static async getAnswers(req, res) {
        try {
            const answers = await Answer.find({ questionId: req.params.id });
            return res.status(200).json({ answers });
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async updateAnswer(req, res) {
        const question = await Question.findOne({ _id: req.params.id });
        if (!question)
            return res.status(400).json({ message: 'Question not found' });
        const answer = await Answer.findOne({ _id: req.params.aid });
        if (!answer)
            return res.status(400).json({ message: 'Answer not found' });
        if (String(answer.userId) !== req.user.userId)
            return res.status(401).json({ message: 'Not author' });
        try {
            const newAnswer = await Answer.findByIdAndUpdate(
                { _id: req.params.aid },
                {
                    $set: {
                        answer: req.body.answer,
                        dateUpdated: Date.now(),
                    },
                },
                { new: true }
            );

            return res.status(201).json(newAnswer);
        } catch (err) {
            return res.status(401).json({ message: err });
        }
    }

    static async upVote(req, res) {
        try {
            const answer = await Answer.findOne({ _id: req.params.aid });
            const upVotes = answer.upvotes;
            const downVotes = answer.downvotes;
            const upVoted = upVotes.findIndex(
                (vote) => vote === req.user.userId
            );
            if (upVoted > -1) {
                return res.status(401).json({ message: 'You already voted' });
            }
            const downVoted = downVotes.findIndex(
                (vote) => vote === req.user.userId
            );

            const makeVote = await Answer.findById(req.params.aid);
            if (downVoted > -1) makeVote.downvotes.splice(downVoted, 1);
            makeVote.upvotes.push(req.user.userId);
            makeVote.save();
            return res.status(200).json(makeVote);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async downVote(req, res) {
        const answer = await Answer.findOne({ _id: req.params.aid });
        const upVotes = answer.upvotes;
        const downVotes = answer.downvotes;
        const downVoted = downVotes.findIndex(
            (vote) => vote === req.user.userId
        );
        if (downVoted > -1) {
            return res.status(401).json({ message: 'You already voted' });
        }
        const upVoted = upVotes.findIndex((vote) => vote === req.user.userId);
        try {
            const makeVote = await Answer.findById(req.params.aid);
            if (upVoted > -1) makeVote.upvotes.splice(upVoted, 1);
            makeVote.downvotes.push(req.user.userId);
            makeVote.save();
            return res.status(200).json(makeVote);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async resetVote(req, res) {
        const answer = await Answer.findOne({ _id: req.params.aid });
        if (!answer)
            return res.status(400).json({ message: 'Answer not found' });
        const upVotes = answer.upvotes;
        const downVotes = answer.downvotes;
        const downVoted = downVotes.findIndex(
            (vote) => vote === req.user.userId
        );
        const upVoted = upVotes.findIndex((vote) => vote === req.user.userId);
        try {
            answer.upvotes.splice(upVoted, 1);
            answer.downvotes.splice(downVoted, 1);
            answer.save();
            return res.status(200).json(answer);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async deleteAnswer(req, res) {
        const question = await Question.findOne({ _id: req.params.id });
        if (!question)
            return res.status(400).json({ message: 'Question not found' });
        const answer = await Answer.findOne({ _id: req.params.aid });
        if (!answer)
            return res.status(400).json({ message: 'Answer not found' });
        if (String(answer.userId) !== req.user.userId)
            return res.status(401).json({ message: 'Not author' });
        try {
            const deletedAnswer = await Answer.deleteOne({
                _id: req.params.aid,
            });
            return res
                .status(200)
                .json({ message: 'Answer Deleted ', deletedAnswer });
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async getComments(req, res) {
        try {
            const answer = await Answer.findOne({ _id: req.params.aid });
            const comments = await Comment.find({ answerId: req.params.aid });
            return res.status(200).json({ Answer: answer, Comments: comments });
        } catch (err) {
            return res.status(400).json({
                message: 'Could not find any comments for this answer',
            });
        }
    }

    static async getAComment(req, res) {
        try {
            const answer = await Answer.findOne({ _id: req.params.aid });
            const comment = await Comment.findOne({ _id: req.params.cid });
            return res
                .status(200)
                .json({ Answer: answer.answer, Comment: comment });
        } catch (err) {
            return res.status(400).json({
                message: 'Could not find comment',
            });
        }
    }

    static async postComment(req, res) {
        try {
            const comment = await Comment.create({
                answerId: req.params.aid,
                comment: req.body.comment,
                userId: req.user.userId,
            });

            return res.status(200).json(comment);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async updateComment(req, res) {
        try {
            const comment = await Comment.findByIdAndUpdate(
                { _id: req.params.cid },
                {
                    $set: { comment: req.body.comment },
                },
                { new: true }
            );
            return res.status(201).json(comment);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async deleteAComment(req, res) {
        try {
            const commentAuthor = await Comment.findOne({
                userId: req.user.userId,
            });
            if (!commentAuthor)
                return (400).json({
                    message: 'You are not authorized to delete this comment',
                });

            const deletedComment = await Comment.findOneAndDelete({
                _id: req.params.cid,
            });
            return res
                .status(200)
                .json({ message: 'Comment Deleted', deletedComment });
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }
}

export default questionsController;
