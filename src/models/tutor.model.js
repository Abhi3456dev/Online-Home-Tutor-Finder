const mongoose = require('mongoose')
const tutorProfileSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',
required: true, unique: true },
subjects: [{ type: String, trim: true }],
pricePerHour: { type: Number, required: true, min: 0 },
rating: { type: Number, default: 0, min: 0, max: 5 },
totalReviews: { type: Number, default: 0 },
bio: { type: String, maxlength: 500, default: '' },
experience: { type: Number, default: 0 },
languages: [{ type: String }],
isAvailable: { type: Boolean, default: true }
}, { timestamps: true })
module.exports = mongoose.model('TutorProfile', tutorProfileSchema)