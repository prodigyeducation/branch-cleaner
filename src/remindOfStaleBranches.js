const { findStaleBranches } = require('./github');
const publishMessages = require('./slack/publishMessages');

module.exports = async ({ owner, repository, channel }) => {
    try {
        console.log('{ owner, repository }:', { owner, repository });

        const branches = await findStaleBranches({ owner, repository });
        console.log('stale branches:', branches);

        return await publishMessages({ channel, repository, branches });
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
