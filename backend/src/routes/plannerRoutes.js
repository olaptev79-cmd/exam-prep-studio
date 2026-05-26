const express = require('express');
const { openDatabase } = require('../db/connection');
const { readAll } = require('../services/readService');

const router = express.Router();

router.get('/subjects', async (_, res) => {
  const db = openDatabase();
  try {
    const rows = await readAll(db, 'SELECT * FROM subjects ORDER BY examDate ASC');
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Failed to load subjects.' });
  } finally {
    db.close();
  }
});

module.exports = router;
