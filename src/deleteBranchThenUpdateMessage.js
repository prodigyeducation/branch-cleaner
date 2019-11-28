const { deleteBranch } = require('./github');
const { feedbackMessageV1, feedbackMessageV2 } = require('./slack/feedbackMessage');

// eslint-disable-next-line object-curly-newline
module.exports = async ({ owner, repository, branch, channel, message, user }) => {
  let result;
  try {
    await deleteBranch({ owner, repository, branch });
    result = 'S';
  } catch (err) {
    const statusCode = err.response.status;
    if (statusCode === 422) {
      result = 'A';
    } else {
      result = 'F';
      // eslint-disable-next-line no-console
      console.log('delete error:', JSON.stringify(err.response.data, null, 2));
    }
  }

  // keep this for the time being for backward compatibility
  if (message.ts.substr(0, 10).localeCompare('1559365200') < 0) {
    // eslint-disable-next-line object-curly-newline
    await feedbackMessageV1({ channel, user, repository, branch, result });
  } else {
    await feedbackMessageV2({
      channel,
      message,
      user,
      repository,
      branch,
      result,
    });
  }
};
