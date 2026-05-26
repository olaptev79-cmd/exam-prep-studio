const express = require('express');
const { openDatabase } = require('../db/connection');
const { readAll } = require('../services/readService');

const router = express.Router();

router.get('/queue', async (_, res) => {
  const db = openDatabase();
  try {
    const rows = await readAll(db, 'SELECT * FROM tasks ORDER BY id DESC');
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Failed to load tasks.' });
  } finally {
    db.close();
  }
});

module.exports = router;
