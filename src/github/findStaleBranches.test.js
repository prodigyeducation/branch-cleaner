const findStaleBranches = require('./findStaleBranches');

const fetchBranches = require('./fetchBranches');
const filterStaleBranches = require('./filterStaleBranches');

jest.mock('./fetchBranches');
jest.mock('./filterStaleBranches');

describe('findStaleBranches()', () => {
  const owner = 'TestOwner';
  const repository = 'test-repository';

  afterEach(() => {
    fetchBranches.mockClear();
    filterStaleBranches.mockClear();
  });

  it('calls fetchBranches', async () => {
    await findStaleBranches({ owner, repository });

    expect(fetchBranches).toBeCalledTimes(1);
  });

  it('calls filterStaleBranches', async () => {
    const nodes = [];
    fetchBranches.mockResolvedValue(nodes);

    await findStaleBranches({ owner, repository });

    expect(filterStaleBranches).toBeCalledTimes(1);
    expect(filterStaleBranches).toBeCalledWith({ nodes });
  });
});
