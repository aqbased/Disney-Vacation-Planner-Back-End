const express = require('express')

const passport = require('passport')

const requireToken = passport.authenticate('bearer', { session: false })

const { handle404, requireOwnership } = require('./../../lib/custom_errors')

const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router()

const Trip = require('./../models/trip')

// Create Trip
// TOKEN=aa8272e3fd0ce150fa779e4b183b851b NAME="March Test Run" DATES="03-04-20 TO 03-10-20" DESCRIPTION="All Star Resort, Every Park" sh curl-scripts/trips/create-trip.sh
router.post('/trips', requireToken, (req, res, next) => {
  const tripData = req.body.trip
  tripData.owner = req.user._id
  Trip.create(tripData)
    .then(trip => res.status(201).json(trip))
    .catch(next)
})

// Index Trip
// TOKEN=ab5ea5979f95fed6a2427237541789a3 sh curl-scripts/trips/index.sh
router.get('/trips', requireToken, (req, res, next) => {
  const userId = req.user.id
  Trip.find({ owner: userId })
    .then(trips => trips.map(trip => trip.toObject()))
    .then(trips => res.json(trips))
    .catch(next)
})

// Show Trip
// TOKEN=ab5ea5979f95fed6a2427237541789a3 ID=60412f97b91f688e349fecce sh curl-scripts/trips/show-trip.sh
router.get('/trips/:id', requireToken, (req, res, next) => {
  Trip.findById(req.params.id)
    .then(handle404)
    .then(trip => requireOwnership(req, trip))
    .then(trip => res.status(200).json({ trip: trip.toObject() }))
    .catch(next)
})

// Update Trip
//
router.patch('/trips/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.trip.owner
  Trip.findById(req.params.id)
    .then(handle404)
    .then(trip => requireOwnership(req, trip))
    .then(trip => trip.updateOne(req.body.trip))
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY Trip
//
router.delete('/trips/:id', requireToken, (req, res, next) => {
  Trip.findById(req.params.id)
    .then(handle404)
    .then(trip => {
      requireOwnership(req, trip)
      trip.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
