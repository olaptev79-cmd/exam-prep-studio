const fs = require('fs');
const { databaseFile, openDatabase } = require('./connection');

if (fs.existsSync(databaseFile)) {
  fs.unlinkSync(databaseFile);
}

const db = openDatabase();

const schema = [
  'CREATE TABLE subjects (id INTEGER PRIMARY KEY, name TEXT, priority TEXT, examDate TEXT, progress INTEGER, weakTopic TEXT)',
  'CREATE TABLE tasks (id INTEGER PRIMARY KEY, title TEXT, subject TEXT, status TEXT, duration TEXT)',
  'CREATE TABLE practice_sets (id INTEGER PRIMARY KEY, name TEXT, questions INTEGER, score INTEGER, difficulty TEXT)',
  'CREATE TABLE weekly_progress (id INTEGER PRIMARY KEY, week TEXT, weekOrder INTEGER, score INTEGER, hours INTEGER)'
];

const subjects = [
  ['Mathematics', 'High', '2026-05-30', 78, 'Probability'],
  ['Physics', 'High', '2026-06-02', 69, 'Optics'],
  ['English', 'Medium', '2026-06-05', 84, 'Essay structure'],
  ['Computer Science', 'Low', '2026-06-08', 88, 'Graphs']
];

const tasks = [
  ['Solve one mixed probability set', 'Mathematics', 'Today', '45 min'],
  ['Review optics flashcards', 'Physics', 'Today', '25 min'],
  ['Rewrite one essay opening', 'English', 'Tomorrow', '20 min'],
  ['Debug graph traversal notes', 'Computer Science', 'Tomorrow', '35 min']
];

const sets = [
  ['Algebra speed round', 25, 76, 'Medium'],
  ['Mechanics fundamentals', 20, 68, 'Hard'],
  ['Essay grammar warm-up', 18, 89, 'Easy']
];

const trend = [
  ['W1', 1, 54, 8],
  ['W2', 2, 61, 9],
  ['W3', 3, 66, 10],
  ['W4', 4, 68, 11],
  ['W5', 5, 71, 12],
  ['W6', 6, 73, 13]
];

// Create schema and demo records
 db.serialize(() => {
  schema.forEach((sql) => db.run(sql));
  subjects.forEach((row) => db.run('INSERT INTO subjects (name, priority, examDate, progress, weakTopic) VALUES (?, ?, ?, ?, ?)', row));
  tasks.forEach((row) => db.run('INSERT INTO tasks (title, subject, status, duration) VALUES (?, ?, ?, ?)', row));
  sets.forEach((row) => db.run('INSERT INTO practice_sets (name, questions, score, difficulty) VALUES (?, ?, ?, ?)', row));
  trend.forEach((row) => db.run('INSERT INTO weekly_progress (week, weekOrder, score, hours) VALUES (?, ?, ?, ?)', row));
});

db.close();
console.log('Seed complete');
