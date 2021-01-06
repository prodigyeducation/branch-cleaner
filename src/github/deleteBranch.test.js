import axios from 'axios';
import deleteBranch from './deleteBranch';

jest.mock('axios');

test('deleteBranch() calls Github API', async () => {
  // given
  const owner = 'TestOwner';
  const repository = 'test-repository';
  const branch = 'test/test-branch';

  // when
  await deleteBranch({ owner, repository, branch });

  // then
  expect(axios.delete).toBeCalledTimes(1);

  const [call] = axios.delete.mock.calls;
  const [url, config] = call;

  // eslint-disable-next-line no-useless-escape
  expect(url).toMatch(new RegExp(`\/repos\/${owner}/${repository}\/git\/refs\/heads\/${branch}$`));
  expect(config.headers).toHaveProperty('Authorization');
});
