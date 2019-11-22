const { github } = require('../config');

module.exports = ({ nodes, excludedBranches = github.exclude }) => {
    const past = new Date();
    past.setMonth(past.getMonth() - 3);

    const staleBranches = nodes.filter(
        ({ target: { committedDate } }) => Date.parse(committedDate) < past
    ).filter(
        ({ name }) => !excludedBranches.includes(name)
    );

    staleBranches.sort((a, b) => a.target.committedDate.localeCompare(b.target.committedDate));

    return staleBranches.map(({ name, target: { committedDate, author: { user } } }) => ({
        date: committedDate.substr(0, 10),
        name,
        user: user || {}
    }));
};
