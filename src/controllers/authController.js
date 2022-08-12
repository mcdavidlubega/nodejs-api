import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/Users';

class authController {
    static async loginUser(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Email' });
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass)
            return res.status(400).json({ message: 'Invalid Password' });
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.TOKEN_SECRET
        );
        return res.header('auth-token', token).json({
            userId: user._id,
            username: user.username,
            email: user.email,
            password: '********',
            token,
        });
    }
}

export default authController;
