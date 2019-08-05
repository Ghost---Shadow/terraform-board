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
  const basenames = [];
  const allGraphs = allFiles.map((filename) => {
    console.log('Parsing', filename);
    const basename = path.basename(path.dirname(filename));
    const source = fs.readFileSync(filename);
    const result = hcl.parse(source);
    const baseNodes = [];
    if (basenames.indexOf(basename) === -1) {
      basenames.push(basename);
      baseNodes.push({
        data: {
          id: basename,
          label: basename,
          type: 'basename',
        },
      });
    }
    const transformedGraph = transformer(result, basename);
    return baseNodes.concat(transformedGraph);
  });

  res.send(allGraphs.reduce((acc, next) => acc.concat(next)));
});

app.use('/', express.static(path.join(__dirname, '../', 'build')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
