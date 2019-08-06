#!/usr/bin/env node

const hcl = require('gopher-hcl');
const fs = require('fs');
const express = require('express');
const path = require('path');
const _ = require('lodash');

const { transformer } = require('./node-mapper');
const { generateEdges } = require('./edge-mapper');
const { walk } = require('./walker');

const app = express();
const port = 3001;

app.get('/api/graph', (req, res) => {
  console.log('/api/graph');
  // TODO: Get from API
  const inputDir = path.join('./');
  const allFiles = walk(path.join(path.resolve(inputDir)));
  const basenameMap = {};
  allFiles.forEach((filename) => {
    const basename = path.basename(path.dirname(filename));
    if (!basenameMap[basename]) basenameMap[basename] = [];
    basenameMap[basename].push(filename);
  });
  const allGraphs = Object.keys(basenameMap).map((basename) => {
    const baseNodes = [{
      data: {
        id: basename,
        label: basename,
        type: 'basename',
      },
    }];
    const fileNodes = [];
    let nodes = [];
    const allElements = basenameMap[basename].reduce((acc, filename) => {
      console.log('Parsing', filename);
      const fname = path.basename(filename);
      fileNodes.push({
        data: {
          id: `${basename}/${fname}`,
          label: fname,
          type: 'fname',
          parent: basename,
        },
      });
      const source = fs.readFileSync(filename);
      const parsedSource = hcl.parse(source);
      const extractedNodes = transformer(parsedSource, basename, fname);
      nodes = nodes.concat(extractedNodes);
      return _.merge(acc, parsedSource);
    }, {});
    const edges = generateEdges(allElements, basename);
    return baseNodes.concat(fileNodes).concat(nodes).concat(edges);
  });
  res.send(allGraphs.reduce((acc, next) => acc.concat(next)));
});

app.use('/', express.static(path.join(__dirname, '../', 'build')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
