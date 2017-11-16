/*
module used for routing requests to the :minionId/work endpoints
*/

const express = require('express');
const db = require('./db');

// create a router for minions
workRouter = express.Router();

// send all work objects in an array
workRouter.get('/', (req, res, next) => {
  const allWork = db.getAllFromDatabase('work');
  const minionWork = allWork.filter(work => {
    return work.id === req.minionId;
  });
  res.send(minionWork);
});

// add a new work object to the database
workRouter.post('/', (req, res, next) => {
  res.send();
  //res.status(201).send(db.addToDatabase('minions', req.body));
});

// update a work object in the database with data from the request body
workRouter.put('/:workId', (req, res, next) => {
  const minion = db.getFromDatabaseById('minions', req.body.minionId);
  if (minion !== undefined) {
    res.send(db.updateInstanceInDatabase('work', req.body));
  } else {
    res.status(400).send();
  }
  
});

// delete a work object from the database
workRouter.delete('/:workId', (req, res, next) => {
  db.deleteFromDatabasebyId('work', req.params.workId);
  res.status(204).send();
});

// export work router for use in the app
module.exports = workRouter;