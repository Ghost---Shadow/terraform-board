const fs = require('fs');
const path = require('path');

// TODO: Research which directories should be ignored
const checkIfDirectoryShouldBeIgnored = fullPath => !!fullPath
  .match(/node_modules/);

const checkIfFileShouldBeIgnored = (fullPath) => {
  const hasCorrectExtension = fullPath.trim().match(/\.(tf|hcl|tfvars)$/);
  return !hasCorrectExtension;
};

const walk = (rootDir, allFiles = []) => {
  const files = fs.readdirSync(rootDir);
  files.forEach((file) => {
    const fullPath = path.join(rootDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!checkIfDirectoryShouldBeIgnored(fullPath)) {
        walk(fullPath, allFiles);
      }
    } else if (!checkIfFileShouldBeIgnored(fullPath)) {
      allFiles.push(fullPath);
    }
  });
  return allFiles;
};

module.exports = {
  walk,
  checkIfDirectoryShouldBeIgnored,
  checkIfFileShouldBeIgnored,
};
