/*
module used for routing requests to the /minions endpoints
*/

const express = require('express');
const db = require('./db');

// create a router for minions
minionsRouter = express.Router();

// send all minion objects in an array
minionsRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('minions'));
});

// verify minionId, attach minionId and minion to request body
minionsRouter.use('/:minionId', (req, res, next) => {
  const minionId = req.params.minionId;
  const minion = db.getFromDatabaseById('minions', minionId);
  if (minion !== undefined) {
    req.minionId = minionId;
    req.minion = minion;
    next();
  } else {
    res.status(404).send('Invalid Minion ID');
  }
});

// send a single minion, found via its ID, as an object.
minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

// add a new minion to the database
minionsRouter.post('/', (req, res, next) => {
  res.status(201).send(db.addToDatabase('minions', req.body));
});

// update a minion in the database with data from the request body
minionsRouter.put('/:minionId', (req, res, next) => {
  res.send(db.updateInstanceInDatabase('minions', req.body));
});

// delete a minion from the database
minionsRouter.delete('/:minionId', (req, res, next) => {
  db.deleteFromDatabasebyId('minions', req.minionId);
  res.status(204).send();
});

// export minion router for use in the app
module.exports = minionsRouter;