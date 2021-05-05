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

app.put('/api/codeJournal/:entryId', (req, res, next) => {
  const entryId = req.params.entryId;
  const { photoUrl, title, notes } = req.body;
  const sql = `
  update "journal"
    set "photoUrl" = $1,
        "title" = $2,
        "notes" = $3
    where "entryId" = $4
    returning *
  `;
  const params = [photoUrl, title, notes, entryId];
  db.query(sql, params)
    .then(result => {
      const [entry] = result.rows;
      res.status(201).json(entry);
    })
    .catch(err => next(err));
});
app.listen(process.env.PORT, () => {
  console.log(`express server listening on port ${process.env.PORT}`);
});
