const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    completed: {
        type: Boolean,
    },
    time: { 
        type: Date, 
        default: Date.now,
    }
});

module.exports = mongoose.model('History', HistorySchema);