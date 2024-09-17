const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['employee', 'admin'], default: 'employee' },
    salary_per_hour: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
