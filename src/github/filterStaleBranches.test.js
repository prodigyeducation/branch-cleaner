import filterStaleBranches from './filterStaleBranches';

jest.mock('axios');

describe('filterStaleBranches()', () => {
  let past;

  beforeEach(() => {
    past = new Date();
    past.setMonth(past.getMonth() - 4);
  });

  describe('excludes', () => {
    let nodes;
    beforeEach(() => {
      // given
      nodes = ['bugfix/foo', 'bugfix/bar', 'develop', 'feature/foo', 'feature/bar', 'master'].map(
        (name) => ({
          name,
          target: {
            committedDate: past.toISOString(),
            author: { user: {} },
          },
        })
      );
    });

    it('default branch', async () => {
      const defaultBranch = 'master';
      // when
      const branches = filterStaleBranches({ nodes, defaultBranch });

      // then
      expect(branches.map(({ name }) => name)).toEqual(expect.not.arrayContaining([defaultBranch]));
    });

    it('specifed branches', async () => {
      const excludedBranches = ['develop'];

      // when
      const branches = filterStaleBranches({ nodes, excludedBranches });

      // then
      expect(branches.map(({ name }) => name)).toEqual(
        expect.not.arrayContaining(excludedBranches)
      );
    });
  });

  it('filters by committed date', async () => {
    // given
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
});
