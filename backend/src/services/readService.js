function readAll(db, sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, [], (error, rows) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(rows);
    });
  });
}

module.exports = { readAll };
