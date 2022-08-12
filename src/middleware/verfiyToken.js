import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return, func-names
export default function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
}
