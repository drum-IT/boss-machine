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
minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = db.getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    req.minionId = req.minion.id;
    next();
  } else {
    res.status(404).send('Invalid Minion ID');
  }
});

// send a single minion, found via its ID, as an object.
minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

// send all minion work in an array
minionsRouter.get('/:minionId/work', (req, res, next) => {
  const allWork = db.getAllFromDatabase('work');
  const minionWork = allWork.filter(work => {
    return work.id === req.minionId;
  });
  res.send(minionWork);
});

// add a new minion to the database
minionsRouter.post('/', (req, res, next) => {
  res.status(201).send(db.addToDatabase('minions', req.body));
});

// add a new work object to the database
minionsRouter.post('/:minionId/work', (req, res, next) => {
  res.status(201).send(db.addToDatabase('work', req.body));
});

// update a minion in the database with data from the request body
minionsRouter.put('/:minionId', (req, res, next) => {
  res.send(db.updateInstanceInDatabase('minions', req.body));
});

// update a work object in the database with data from the request body
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  const minion = db.getFromDatabaseById('minions', req.body.minionId);
  if (minion) {
    res.send(db.updateInstanceInDatabase('work', req.body));
  } else {
    res.status(400).send();
  }
});

// delete a minion from the database
minionsRouter.delete('/:minionId', (req, res, next) => {
  db.deleteFromDatabasebyId('minions', req.minionId);
  res.status(204).send();
});

// delete a work object from the database
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  db.deleteFromDatabasebyId('work', req.params.workId);
  res.status(204).send();
});

// export minion router for use in the app
module.exports = minionsRouter;