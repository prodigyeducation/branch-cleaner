import remindOfStaleBranches from '../src/remindOfStaleBranches';
import remindOfTestBranches from '../src/remindOfTestBranches';

// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { owner, repository, channel, test } = event.queryStringParameters;
  let response;
  if (test) {
    response = await remindOfTestBranches({ owner, repository, channel });
  } else {
    response = await remindOfStaleBranches({ owner, repository, channel });
  }
  return {
    statusCode: response.status,
    body: JSON.stringify(response.data),
  };
}
