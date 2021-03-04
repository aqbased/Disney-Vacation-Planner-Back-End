const express = require('express')

const passport = require('passport')

const requireToken = passport.authenticate('bearer', { session: false })

const { handle404, requireOwnership } = require('./../../lib/custom_errors').handle404

const router = express.Router()

const Trip = require('./../models/trip')

// Create Trip
// TOKEN=aa8272e3fd0ce150fa779e4b183b851b NAME="March Test Run" DATES="03-04-20 TO 03-10-20" DESCRIPTION="All Star Resort, Every Park" sh curl-scripts/trips/create-trip.sh
router.post('/trips', requireToken, (req, res, next) => {
  console.log('The user OBJ:', req.user)
  console.log('the incoming event data is', req.body)
  // console.log('the tripData is', tripData)
  const tripData = req.body.trip
  tripData.owner = req.user._id
  Trip.create(tripData)
    .then(trip => res.status(201).json(trip))
    .catch(next)
})

module.exports = router
