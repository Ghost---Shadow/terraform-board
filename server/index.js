#!/usr/bin/env node

const hcl = require('gopher-hcl');
const fs = require('fs');
const express = require('express');
const path = require('path');

const { transformer } = require('./helpers');
const { walk } = require('./walker');

const app = express();
const port = 3001;

app.get('/api/graph', (req, res) => {
  console.log('/api/graph');
  // TODO: Get from API
  const inputDir = path.join('./');
  const allFiles = walk(path.join(path.resolve(inputDir)));
  const allGraphs = allFiles.map((filename) => {
    console.log('Parsing', filename);
    const source = fs.readFileSync(filename);
    const result = hcl.parse(source);
    const transformedGraph = transformer(result);
    return transformedGraph;
  });

  res.send(allGraphs.reduce((acc, next) => acc.concat(next)));
});

app.use('/', express.static(path.join(__dirname, '../', 'build')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
