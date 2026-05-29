const jwt = require('jsonwebtoken')

const generateToken = (res, userId, role) => {
  const token = jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  // HTTP-only cookie mein store karo — Dev-Tinder wala same pattern
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000   // 7 days
  })
}
module.exports = generateToken