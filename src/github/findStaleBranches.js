const fetchBranches = require('./fetchBranches');
const filterStaleBranches = require('./filterStaleBranches');

module.exports = async ({ owner, repository }) => {
  const { nodes, defaultBranchName } = await fetchBranches({ owner, repository });
  return filterStaleBranches({ nodes, defaultBranchName });
};
