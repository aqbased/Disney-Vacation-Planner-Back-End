const mongoose = require('mongoose')

const eventSchema = require('./event')

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dates: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  events: [eventSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Trip', tripSchema)
