const express = require('express');
const tourController = require('./../controllers/tourController');

const fs = require('fs');

const router = express.Router(); // Create new Router

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
// Mounting the router

module.exports = router;
