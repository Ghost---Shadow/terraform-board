#!/usr/bin/env node

const hcl = require('gopher-hcl');
const fs = require('fs');
const express = require('express');
const path = require('path');

const { transformer } = require('./helpers');

const app = express();
const port = 3001;

app.get('/api/graph', (req, res) => {
  console.log('/api/graph');
  const source = fs.readFileSync(path.join(__dirname, 'scenarios/01_basic/hcl/entry.hcl'));
  const result = hcl.parse(source);
  const transformedGraph = transformer(result);
  res.send(transformedGraph);
});

app.use('/', express.static(path.join(__dirname, '../', 'build')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
