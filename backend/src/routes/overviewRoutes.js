const express = require('express');

const router = express.Router();

router.get('/snapshot', (_, res) => {
  res.json({
    readinessScore: 73,
    studyHours: 41,
    openTasks: 6,
    nextExamLabel: '4 days',
    nextExamTitle: 'Mathematics final is next on the calendar',
    focusMessage: 'One strong probability session today will reduce pressure for the rest of the week.'
  });
});

module.exports = router;
