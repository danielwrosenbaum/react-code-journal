require('dotenv/config');
const express = require('express');
const db = require('./db');
const staticMiddleware = require('./static-middleware');

const app = express();
const jsonMiddleware = express.json();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/codeJournal', (req, res, next) => {
  const sql = `
  select *
    from "journal"
    order by "entryId" DESC
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/codeJournal', (req, res, next) => {
  const { photoUrl, title, notes } = req.body;
  const sql = `
  insert into "journal" ("title", "photoUrl", "notes")
  values ($1, $2, $3)
  returning *
  `;
  const params = [title, photoUrl, notes];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});
app.listen(process.env.PORT, () => {
  console.log(`express server listening on port ${process.env.PORT}`);
});
