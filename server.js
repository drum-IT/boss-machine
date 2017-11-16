const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const morgan = require('morgan');
const app = express();

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;


// Add middleware for handling CORS requests from index.html
app.use(cors());


// Add middleware for parsing request bodies here:
app.use(bodyParser.json());


// Add middleware for logging here:

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// Verify the request ID before routing.
/*app.use(['/api/minions/:minionId', '/api/ideas/:ideaId', '/api/meetings/:meetingId'], (req, res, next) => {
  
});*/

// Import and mount the individual routers
const ideasRouter = require('./server/ideas');
app.use('/api/ideas', ideasRouter);

const meetingsRouter = require('./server/meetings');
app.use('/api/meetings', meetingsRouter);

const minionsRouter = require('./server/minions');
app.use('/api/minions', minionsRouter);

const workRouter = require('./server/work');
app.use('/api/minions/:minionId/work', workRouter);


// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server is now listening on ${PORT}.`);
  });
}
