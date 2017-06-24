'use strict';

const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    machine_id: { type: String, required: true},
    id: {type:String, required: true},
    timestamp: { type: Date, index: true},
    status: { type: String, index: true}
});

module.exports = mongoose.model('Event', eventSchema);