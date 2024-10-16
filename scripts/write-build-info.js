const gitCommitInfo = require('git-commit-info');
const branchName = require('current-git-branch');
const fs = require('node:fs');

const content = {
  branch: branchName(),
  ...gitCommitInfo(),
};

fs.writeFileSync(__dirname + '/../dist/build-info.txt', JSON.stringify(content, null, 2));
