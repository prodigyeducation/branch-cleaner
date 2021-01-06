import fetchBranches from './fetchBranches';
import filterStaleBranches from './filterStaleBranches';

export default async ({ owner, repository }) => {
  const { nodes, defaultBranch } = await fetchBranches({ owner, repository });
  return filterStaleBranches({ nodes, defaultBranch });
};
