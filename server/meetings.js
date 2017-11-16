/*
module used for routing requests to the /meetings endpoints
*/

const express = require('express');
const db = require('./db');

// create a router for meetings
meetingsRouter = express.Router();

// send all meeting objects in an array
meetingsRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('meetings'));
});

// create and add a meeting to the database
meetingsRouter.post('/', (req, res, next) => {
  res.status(201).send(db.addToDatabase('meetings', db.createMeeting()));
});

// delete an meeting from the database
meetingsRouter.delete('/', (req, res, next) => {
  db.deleteAllFromDatabase('meetings');
  res.status(204).send();
});

// export meeting router for use in the app
module.exports = meetingsRouter;