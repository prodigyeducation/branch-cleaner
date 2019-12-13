const findStaleBranches = require('./findStaleBranches');

const fetchBranches = require('./fetchBranches');
const filterStaleBranches = require('./filterStaleBranches');

jest.mock('./fetchBranches');
jest.mock('./filterStaleBranches');

describe('findStaleBranches()', () => {
  const owner = 'TestOwner';
  const repository = 'test-repository';
  const nodes = [];
  const defaultBranchName = 'master';

  beforeEach(() => {
    fetchBranches.mockResolvedValue({ nodes, defaultBranchName });
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
    expect(filterStaleBranches).toBeCalledWith({ nodes, defaultBranchName });
  });
});
