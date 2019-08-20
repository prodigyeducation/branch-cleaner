const { findStaleBranches } = require('./github');
const publishMessages = require('./slack/publishMessages');

const TEST_BRANCHES = [
    {
        date: '2019-01-01',
        name: 'test/dale1',
        user: { name: 'Dale Seo' }
    },
    {
        date: '2019-02-02',
        name: 'test/dale2',
        user: { name: 'Dale Seo' }
    },
    {
        date: '2019-03-03',
        name: 'test/dale3',
        user: { name: 'Dale Seo' }
    }
];

module.exports = async ({ owner, repository, channel }) => {
    try {
        return await publishMessages({ channel, repository, branches: TEST_BRANCHES });
    } catch (err) {
        console.log('ERROR:', err);
        if (err.response) {
            return err.response;
        } else {
            return {
                status: 500,
                data: JSON.stringify(err)
            };
        }
    }
};
