'use strict';

const database = require('./database.js');

module.exports.get_countdown = async (event, context) => {
  const { token, target } = JSON.parse(event.body)
  const queryString = `INSERT INTO countdowns (token, target)
                      VALUES (?, ?);`

  const db = new database.Database({
    host: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PW,
    queryString: queryString,
    queryParams: [token, target],
  });

  await db.getQueryResult();

  return {
    body: JSON.stringify({
      message: 'Success',
      token,
      target,
    }),
  };
};