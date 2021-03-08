const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  parkPlan: {
    type: String
  },
  content: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = eventSchema
