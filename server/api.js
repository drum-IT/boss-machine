const express = require('express');
const apiRouter = express.Router();

// Import and mount the individual routers
const ideasRouter = require('./ideas');
apiRouter.use('/ideas', ideasRouter);

const meetingsRouter = require('./meetings');
apiRouter.use('/meetings', meetingsRouter);

const minionsRouter = require('./minions');
apiRouter.use('/minions', minionsRouter);

module.exports = apiRouter;