const express = require('express')

const router = express.Router()

const Trip = require('./../models/trip')

const { handle404 } = require('./../../lib/custom_errors')

// const removeBlanks = require('../../lib/remove_blank_fields')

const passport = require('passport')

const requireToken = passport.authenticate('bearer', { session: false })

// CREATE EVENT //
router.post('/trips/:id/events', requireToken, (req, res, next) => {
  console.log('this is req.body.event', req.body.event)
  const eventData = req.body.event
  const id = req.params.id
  console.log('this is id', id)
  Trip.findOne({ _id: id, owner: req.user.id })
    .then(handle404)
    .then(trip => {
      trip.events.push(eventData)
      return trip.save()
    })
    .then(trip => res.status(201).json({ trip }))
    .catch(next)
})

module.exports = router
