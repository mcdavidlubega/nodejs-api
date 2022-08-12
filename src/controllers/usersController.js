import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/Users';
import Question from '../models/Questions';

class usersController {
    /**
     * Create a new user
     * @param {*} req
     * @param {*} res
     * @returns userId, username, email, password
     */

    static async registerUser(req, res) {
        const { username, email, password } = req.body;

        const usernameExists = await User.findOne({ username });
        if (usernameExists)
            return res.status(400).json({ message: 'Username already exists' });

        const emailExists = await User.findOne({ email });
        if (emailExists)
            return res.status(400).json({ message: 'Email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        try {
            const user = await User.create({
                userId: uuidv4(),
                username,
                email,
                password: hashedPass,
            });
            return res.status(201).json({
                userId: user._id,
                username: user.username,
                email: user.email,
                password: '********',
                role: user.role,
            });
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    /**
     * Delete a user
     * @param {*} req
     * @param {*} res
     * @returns
     */
    static async deleteUser(req, res) {
        try {
            const userExists = await User.findOne({ _id: req.params.id });
            if (!userExists)
                return res.status(400).json({ message: 'User not found' });
            if (userExists.role !== 'admin') {
                return res.status(400).json({
                    message: 'You are not authorised to delete users',
                });
            }

            const deletedUser = await User.deleteOne({ _id: req.params.id });
            return res
                .status(200)
                .json({ message: 'User Deleted ', deletedUser });
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async getAllUserQuestions(req, res) {
        try {
            const questions = await Question.find({ userId: req.params.id });
            return res.status(200).json(questions);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }
}

export default usersController;
