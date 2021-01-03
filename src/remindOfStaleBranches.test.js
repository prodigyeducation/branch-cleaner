import remindOfStaleBranches from './remindOfStaleBranches';
import { findStaleBranches } from './github';
import publishMessages from './slack/publishMessages';

jest.mock('./github');
jest.mock('./slack/publishMessages');

describe('remindOfStaleBranches', () => {
  const owner = 'TestOwner';
  const repository = 'test-repository';
  const channel = 'C1234568';

  beforeEach(() => {
    findStaleBranches.mockClear();
    publishMessages.mockClear();
  });

  it('finds stale branches with owner and repository', async () => {
    // when
    await remindOfStaleBranches({ owner, repository, channel });

    // then
    expect(findStaleBranches).toBeCalledTimes(1);
    expect(findStaleBranches).toBeCalledWith({ owner, repository });
  });

  it('publishes message with stale branches', async () => {
    // given
    const branches = [1, 2].map((num) => ({
      date: `2019-0${num}-0${num}`,
      name: `test-branch${num}`,
      user: { name: 'Test User' },
    }));

    findStaleBranches.mockResolvedValue(branches);

    // when
    await remindOfStaleBranches({ owner, repository, channel });

    // then
    expect(publishMessages).toBeCalledTimes(1);
    expect(publishMessages).toBeCalledWith({ channel, repository, branches });
  });

  it('returns the status and data of the response if no error occurs', async () => {
    // given
    publishMessages.mockResolvedValue({
      status: 200,
      data: { ok: true, channel, ts: '1550000000.001100', message: 'foo' },
    });

    // when
    const { status, data } = await remindOfStaleBranches({ owner, repository, channel });

    // then
    expect(status).toBe(200);
    expect(data).toEqual({ ok: true, channel, ts: '1550000000.001100', message: 'foo' });
  });

  it('returns the status and data of the response if an error occurs and it contains a response', async () => {
    // given
    publishMessages.mockRejectedValue({
      ...new Error('Test Error'),
      response: { status: 404, data: 'Not Found' },
    });

    // when
    const { status, data } = await remindOfStaleBranches({ owner, repository, channel });

    // then
    expect(status).toBe(404);
    expect(data).toEqual('Not Found');
  });

  it('returns status 500 if an error occurs and it contains no response in it', async () => {
    // given
    publishMessages.mockRejectedValue(new Error('Test Error'));

    // when
    const { status } = await remindOfStaleBranches({ owner, repository, channel });

    // then
    expect(status).toBe(500);
  });
});
