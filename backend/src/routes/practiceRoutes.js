const express = require('express');
const { openDatabase } = require('../db/connection');
const { readAll } = require('../services/readService');

const router = express.Router();

router.get('/sets', async (_, res) => {
  const db = openDatabase();
  try {
    const rows = await readAll(db, 'SELECT * FROM practice_sets ORDER BY score DESC');
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Failed to load practice sets.' });
  } finally {
    db.close();
  }
});

module.exports = router;
