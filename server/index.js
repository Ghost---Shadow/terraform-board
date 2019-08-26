#!/usr/bin/env node

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// const {
//   uploadAwsCredentials,
//   uploadGithubCredentials,
//   cloneAndPullGit,
// } = require('./routes/settings');

const { getGraph } = require('./routes/graph');

const {
  terraformInit,
  terraformPlan,
  terraformApply,
} = require('./routes/apply');

const app = express();
app.use(bodyParser.json({ limit: 99999999999 }));
const port = 3001;

app.get('/api/graph', getGraph);

// app.post('/api/credentials/aws', uploadAwsCredentials);
// app.post('/api/credentials/github', uploadGithubCredentials);
// app.post('/api/git/clone', cloneAndPullGit);

app.get('/api/terraform/init', terraformInit);
app.get('/api/terraform/plan', terraformPlan);
app.get('/api/terraform/apply', terraformApply);

app.use('/', express.static(path.join(__dirname, '../', 'build')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
