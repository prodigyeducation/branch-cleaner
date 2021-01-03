const deleteBranchThenUpdateMessage = require('../src/deleteBranchThenUpdateMessage');
const { isAuthorized } = require('../src/slack/auth');

/**
 * Called by Slack when the delete button is clicked on a message.
 */
// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  if (!isAuthorized(event)) {
    return { statusCode: 403, body: 'Forbidden' };
  }

  const { channel, message, user, actions } = JSON.parse(
    decodeURIComponent(event.body).substring(8)
  );

  const tokens = actions[0].value.split('|');

  if (tokens.length === 3) {
    const [owner, repository, branch] = tokens;
    await deleteBranchThenUpdateMessage({
      owner,
      repository,
      branch,
      channel,
      message,
      user,
    });
  } else {
    const [repository, branch] = tokens;
    await deleteBranchThenUpdateMessage({
      repository,
      branch,
      channel,
      message,
      user,
    });
  }

  return {
    statusCode: 200,
    body: event.body,
  };
}
