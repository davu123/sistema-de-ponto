const mongoose = require('mongoose');

const JustificationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    justification: { type: String, required: true },
    file_url: { type: String, required: false },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Justification', JustificationSchema);
