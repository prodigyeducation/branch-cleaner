import { findStaleBranches } from './github';
import publishMessages from './slack/publishMessages';

export default async ({ owner, repository, channel }) => {
  try {
    const branches = await findStaleBranches({ owner, repository });
    return await publishMessages({ channel, repository, branches });
  } catch (err) {
    if (err.response) return err.response;
    return {
      status: 500,
      data: JSON.stringify(err),
    };
  }
};
