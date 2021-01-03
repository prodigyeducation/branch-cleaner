import { deleteBranch } from './github';
import feedbackMessage from './slack/feedbackMessage';

export default async ({ owner, repository, branch, channel, message, user }) => {
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
