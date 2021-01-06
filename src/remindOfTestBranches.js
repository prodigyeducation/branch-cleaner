import publishMessages from './slack/publishMessages';

const TEST_BRANCHES = [
  {
    date: '2019-01-01',
    name: 'test/dale1',
    user: { name: 'Dale Seo' },
  },
  {
    date: '2019-02-02',
    name: 'test/dale2',
    user: { name: 'Dale Seo' },
  },
  {
    date: '2019-03-03',
    name: 'test/dale3',
    user: { name: 'Dale Seo' },
  },
];

export default async ({ repository, channel }) => {
  try {
    return await publishMessages({ channel, repository, branches: TEST_BRANCHES });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('ERROR:', err);
    if (err.response) return err.response;
    return {
      status: 500,
      data: JSON.stringify(err),
    };
  }
};
