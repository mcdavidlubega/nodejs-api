import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import User from '../models/Users';

class usersController {
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
            //   const newUser = user.save();
            return res.status(200).json({
                userId: user.userId,
                username: user.username,
                email: user.email,
                password: '********',
            });
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async loginUser(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Email' });
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass)
            return res.status(400).json({ message: 'Invalid Password' });
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
        return res.header('auth-token', token).json({
            userId: user._id,
            username: user.username,
            email: user.email,
            password: '********',
            token,
        });
    }
}

export default usersController;
