// models/event.model.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  // e.g., 'pageView', 'click', 'formSubmit'
  eventType: {
    type: String,
    required: true,
    trim: true,
  },
  // e.g., a unique ID for the user
  userId: {
    type: String,
    required: true,
  },
  // Additional details, e.g., { buttonId: 'buy-now', page: '/pricing' }
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  // The timestamp is automatically created when the document is made
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;