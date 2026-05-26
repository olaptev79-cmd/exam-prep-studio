const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const databaseFile = path.join(__dirname, 'exam_prep_studio.db');

function openDatabase() {
  return new sqlite3.Database(databaseFile);
}

module.exports = { openDatabase, databaseFile };
