const { exec } = require('child_process');
const { Readable } = require('stream');

const runAndPipe = (cmd, res) => {
  const process = exec(cmd);
  const s = new Readable();
  s._read = () => {}; // eslint-disable-line no-underscore-dangle
  process.stdout.on('data', (data) => {
    s.push(data);
  });

  process.stderr.on('data', (data) => {
    s.push(data);
  });

  process.on('exit', (code) => {
    s.push(`child process exited with code ${code.toString()}`);
    s.push(null);
    res.end();
  });
  s.pipe(res);
};

const tfstateDir = process.env.TF_STATE_DIR || './.tfstate';

const terraformInit = (req, res) => {
  // const cmd = 'bash ./server/routes/apply/test.sh';
  const cmd = 'terraform init';
  runAndPipe(cmd, res);
};
const terraformPlan = (req, res) => {
  // const cmd = 'bash ./server/routes/apply/test.sh';
  const cmd = `terraform plan -out ${tfstateDir}`;
  runAndPipe(cmd, res);
};
const terraformApply = (req, res) => {
  // const cmd = 'bash ./server/routes/apply/test.sh';
  const cmd = `terraform apply -auto-approve ${tfstateDir}`;
  runAndPipe(cmd, res);
};

module.exports = {
  terraformInit,
  terraformPlan,
  terraformApply,
};
