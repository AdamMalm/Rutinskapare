const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    frequency: [{
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    }],
    highPriority: {
        type: Boolean,
    },
    timeOfDay: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Time',
    },
    historyOfCompletion: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'History',
    }]
});

module.exports = mongoose.model('Routine', RoutineSchema);