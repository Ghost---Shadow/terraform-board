const hcl = require('gopher-hcl');
const fs = require('fs');
const express = require('express');

const { transformer } = require('./helpers');

const app = express();
const port = 3001;

app.get('/api/graph', (req, res) => {
  console.log('/api/graph');
  const source = fs.readFileSync('./src/server/scenarios/01_basic/hcl/entry.hcl');
  const result = hcl.parse(source);
  const transformedGraph = transformer(result);
  res.send(transformedGraph);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
