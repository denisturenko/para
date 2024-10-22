const gitCommitInfo = require('git-commit-info');
const branchName = require('current-git-branch');
const fs = require('node:fs');
var gitTag = require('git-tag')({ localOnly: true });

gitTag.latest(function (tag) {
  const content = {
    branch: branchName(),
    tag,
    ...gitCommitInfo(),
  };

  fs.writeFileSync(__dirname + '/../dist/build-info.txt', JSON.stringify(content, null, 2));
});
