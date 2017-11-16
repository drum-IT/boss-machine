// function to check idea value
const checkMillionDollarIdea = (req, res, next) => {
  const ideaValue = req.body.weeklyRevenue * req.body.numWeeks;
  if (ideaValue >= 1000000) {
    next();
  } else {
    res.status(400).send('This idea is not worth a million dollars!');
  }
}

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
