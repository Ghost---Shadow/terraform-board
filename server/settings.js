const uploadAwsCredentials = (req, res) => res.send(200);
const uploadGithubCredentials = (req, res) => res.send(200);
const cloneAndPullGit = (req, res) => res.send(200);

module.exports = {
  uploadAwsCredentials,
  uploadGithubCredentials,
  cloneAndPullGit,
};
