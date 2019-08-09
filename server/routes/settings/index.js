const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const writeFile = promisify(fs.writeFile);
const exec = promisify(childProcess.exec);

const decodeAndSave = async (base64, directory, filename) => {
  const buffer = Buffer.from(base64.replace(/data:.*base64,/, ''), 'base64');
  await writeFile(path.join(directory, filename), buffer);
};

// For development
const sandbox = './sandbox';

const uploadAwsCredentials = async (req, res) => {
  console.log('/api/credentials/aws');
  try {
    const payload = req.body;
    await decodeAndSave(payload.base64, process.env.AWS_CRED_DIR || sandbox, 'credentials');
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
    await decodeAndSave(payload.base64, process.env.SSH_CRED_DIR || sandbox, 'id_rsa');
    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};

const cloneAndPullGit = async (req, res) => {
  console.log('/api/git/clone');
  try {
    const payload = req.body;
    const destinationDir = process.env.WORK_DIR || './sandbox';
    let cmd = '';
    if (fs.existsSync(path.join(destinationDir, '.git'))) {
      cmd = `git --work-tree=${destinationDir} --git-dir=${destinationDir}/.git pull`;
    } else {
      cmd = `git clone ${payload.url} ${destinationDir}`;
    }
    const result = await exec(cmd);
    return res.status(200).send(result);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};

module.exports = {
  uploadAwsCredentials,
  uploadGithubCredentials,
  cloneAndPullGit,
};
