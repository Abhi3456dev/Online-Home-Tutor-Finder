const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
rating: { type: Number, required: true, min: 1, max: 5 },
comment: { type: String, maxlength: 500, default: '' }
}, { timestamps: true })
// Ek student ek booking pe sirf ek review
reviewSchema.index({ studentId: 1, bookingId: 1 }, { unique: true })
module.exports = mongoose.model('Review', reviewSchema)