const fetchBranches = require('./fetchBranches');
const filterStaleBranches = require('./filterStaleBranches');

module.exports = async ({ owner, repository }) => {
    const nodes = await fetchBranches({ owner, repository });
    console.log('nodes:', nodes);
    return filterStaleBranches({ nodes });
};
