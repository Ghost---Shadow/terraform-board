const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const writeFile = promisify(fs.writeFile);

const decodeAndSave = async (base64, directory) => {
  const buffer = Buffer.from(base64.replace(/data:.*base64,/, ''), 'base64');
  await writeFile(path.join(directory, 'credentials'), buffer);
};

const uploadAwsCredentials = async (req, res) => {
  console.log('/api/credentials/aws');
  try {
    const payload = req.body;
    await decodeAndSave(payload.base64, process.env.AWS_CRED_DIR || './');
    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};
const uploadGithubCredentials = async (req, res) => {
  console.log('/api/credentials/github');
  try {
    const payload = req.body;
    await decodeAndSave(payload.base64, process.env.SSH_CRED_DIR || './');
    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};
const cloneAndPullGit = (req, res) => res.sendStatus(200);

module.exports = {
  uploadAwsCredentials,
  uploadGithubCredentials,
  cloneAndPullGit,
};
