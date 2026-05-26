const express = require('express');
const { openDatabase } = require('../db/connection');
const { readAll } = require('../services/readService');

const router = express.Router();

router.get('/trend', async (_, res) => {
  const db = openDatabase();
  try {
    const rows = await readAll(db, 'SELECT * FROM weekly_progress ORDER BY weekOrder ASC');
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Failed to load trend data.' });
  } finally {
    db.close();
  }
});

module.exports = router;
