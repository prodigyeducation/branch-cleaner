const filterStaleBranches = require('./filterStaleBranches');

jest.mock('axios');

test('filterStaleBranches() excludes specifed branches', async () => {
  // given
  const past = new Date();
  past.setMonth(past.getMonth() - 4);

  const nodes = ['bugfix/foo', 'bugfix/bar', 'develop', 'feature/foo', 'feature/bar', 'master'].map(
    (name) => ({
      name,
      target: {
        committedDate: past.toISOString(),
        author: { user: {} },
      },
    }),
  );
  const excludedBranches = ['master', 'develop'];

  // when
  const branches = filterStaleBranches({ nodes, excludedBranches });

  // then
  expect(branches.map(({ name }) => name)).toEqual(expect.not.arrayContaining(excludedBranches));
});

test('filterStaleBranches() filter by committed date', async () => {
  // given
  const past = new Date();
  past.setMonth(past.getMonth() - 4);

  const staleBranches = ['stale-1', 'stale-2'];
  const freshBranches = ['fresh-1', 'fresh-2', 'fresh-3'];

  const nodes = [
    ...staleBranches.map((name) => ({
      name,
      target: {
        committedDate: past.toISOString(),
        author: { user: {} },
      },
    })),
    ...freshBranches.map((name) => ({
      name,
      target: {
        committedDate: new Date().toISOString(),
        author: { user: {} },
      },
    })),
  ];

  // when
  const branches = filterStaleBranches({ nodes });

  // then
  expect(branches.map(({ name }) => name)).toEqual(expect.arrayContaining(staleBranches));

  expect(branches.map(({ name }) => name)).toEqual(expect.not.arrayContaining(freshBranches));
});
