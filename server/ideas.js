/*
module used for routing requests to the /ideas endpoints
*/

const express = require('express');
const db = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// create a router for ideas
ideasRouter = express.Router();

// send all idea objects in an array
ideasRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('ideas'));
});

// verify ideaId, attach ideaId and idea to request body
ideasRouter.use('/:ideaId', (req, res, next) => {
  const ideaId = req.params.ideaId;
  const idea = db.getFromDatabaseById('ideas', ideaId);
  if (idea !== undefined) {
    req.ideaId = ideaId;
    req.idea = idea;
    next();
  } else {
    res.status(404).send('Invalid Idea ID');
  }
});

// send a single idea, found via its ID, as an object.
ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

// add a new idea to the database
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  res.status(201).send(db.addToDatabase('ideas', req.body));
});

// update a idea in the database with data from the request body
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  res.send(db.updateInstanceInDatabase('ideas', req.body));
});

// delete an idea from the database
ideasRouter.delete('/:ideaId', (req, res, next) => {
  db.deleteFromDatabasebyId('ideas', req.ideaId);
  res.status(204).send();
});

// export idea router for use in the app
module.exports = ideasRouter;