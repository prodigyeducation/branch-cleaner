const { deleteBranch } = require('./github');
const feedbackMessage = require('./slack/feedbackMessage');

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

  await feedbackMessage({
    channel,
    message,
    user,
    repository,
    branch,
    result,
  });
};
