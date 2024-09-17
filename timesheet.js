const mongoose = require('mongoose');

const TimesheetSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { 
        type: String, 
        enum: ['entrada', 'saida', 'entrada_intervalo', 'saida_intervalo'], 
        required: true 
    },
    timestamp: { type: Date, required: true },
    is_manual: { type: Boolean, default: false },
    location: {
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false }
    },
    remarks: { type: String, required: false },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Timesheet', TimesheetSchema);
