const express = require('express');
const Tour = require('../models/tourModel');

// Route Handlers
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; // Convert id: '1' to a number

  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body); // This mehtod returns a promise

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: {
      tour: 'Updated tour',
    },
  });
};

exports.deleteTour = (req, res) => {
  // const id = req.params.id * 1;

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
