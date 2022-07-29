const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Users');

class usersController {
  static async createUser(req, res) {
    const { username, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    // Check if password already exists
    if (emailExists)
      return res.status(401).json({ message: 'Email must be unique' });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    try {
      await newUser.save();
      return res.status(201).json({
        userID: newUser._id,
        username: newUser.username,
        email: newUser.email,
        password: '******',
      });
    } catch (err) {
      return res.status(401).json({ message: err });
    }
  }

  static async getUser(req, res) {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Wrong Email' });
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(400).json({ message: 'Invalid Password' });

    const token = jwt.sign({ Id: user._id }, process.env.TOKEN_SECRET);
    return res.header('auth-token', token).send(token);
  }
}

module.exports = usersController;
