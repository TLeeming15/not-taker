const express = require('express');
const path = require('path');
const fs = require('fs');
let notes = require("./db/db.json")

const app = express();
const PORT = 3001;
const ROOT = { root: path.join(__dirname, './public') };


app.use(express.static(path.join(__dirname, './public')))

app.get('/notes', (req, res) =>
  res.sendFile('notes.html', ROOT)
);

app.get('/api/notes', (req, res) => {
  res.json(notes)
});

app.post('/api/notes', (req, res) => {

  notes.push(req.body)

  // Write updated notes back to the file
  fs.writeFile('./db/db.json',JSON.stringify(notes),
    (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info('Success!')
  );

  res.json(notes)
});

app.get('*', (req, res) =>
res.sendFile('index.html', ROOT)
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
