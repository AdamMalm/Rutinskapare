const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({
    specificTime: {
        type: String,
    },
    nonSpecificTime: [{
        type: String,
        enum: ['Morning', 'Day', 'Evening'],
    }],
});

module.exports = mongoose.model('Time', TimeSchema);