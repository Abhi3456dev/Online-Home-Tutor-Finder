const User = require('../models/user.models')
const generateToken = require('../utils/utils.generateTokens')

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: 'Email already registered' })
    const user = await User.create({ name, email, password, role })
    generateToken(res, user._id, user.role)
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role })
  } catch (err) {
    console.error('FULL ERROR:', err.stack)
    res.status(500).json({ message: err.message })
  }
}  // ← this closing brace was missing

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    generateToken(res, user._id, user.role)
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Logout
exports.logout = (req, res) => {
  res.cookie('token', '', { maxAge: 0 })
  res.json({ message: 'Logged out successfully' })
}

// Current user check
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  res.json(user)
}