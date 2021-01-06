import findStaleBranches from './findStaleBranches';
import fetchBranches from './fetchBranches';
import filterStaleBranches from './filterStaleBranches';

jest.mock('./fetchBranches');
jest.mock('./filterStaleBranches');

describe('findStaleBranches()', () => {
  const owner = 'TestOwner';
  const repository = 'test-repository';
  const nodes = [];
  const defaultBranch = 'master';

  beforeEach(() => {
    fetchBranches.mockResolvedValue({ nodes, defaultBranch });
  });

  afterEach(() => {
    fetchBranches.mockClear();
    filterStaleBranches.mockClear();
  });

  it('calls fetchBranches', async () => {
    await findStaleBranches({ owner, repository });

    expect(fetchBranches).toBeCalledTimes(1);
  });

  it('calls filterStaleBranches', async () => {
    await findStaleBranches({ owner, repository });

    expect(filterStaleBranches).toBeCalledTimes(1);
    expect(filterStaleBranches).toBeCalledWith({ nodes, defaultBranch });
  });
});
