const publishMessages = require('./publishMessages');
const { postMessage } = require('./chat');
const composeBlocks = require('./composeBlocks');

jest.mock('./chat');
jest.mock('./composeBlocks');

describe('publishMessages', () => {
  // given
  const channel = 'CK2853T7S';
  const repository = 'test-repository';
  const branches = [1, 2].map((num) => ({
    date: `2019-0${num}-0${num}`,
    name: `test/dale${num}`,
  }));

  composeBlocks.mockReturnValue(
    [1, 2].map((num) => ({
      type: 'section',
      text: {
        type: 'plain_text',
        text: `test/dale${num}`,
      },
    })),
  );

  afterEach(() => {
    postMessage.mockClear();
  });

  it('post multiple messages', async () => {
    // when
    await publishMessages({ channel, repository, branches });

    // then
    expect(postMessage).toBeCalledTimes(branches.length + 1);
  });

  it('posts header message', async () => {
    // when
    await publishMessages({ channel, repository, branches });

    // then
    expect(postMessage).toBeCalledWith({
      channel,
      type: 'mrkdwn',
      text: `<!here> There are *${branches.length}* stale branches in *${repository}*! Click the delete button if the branch is no longer used. :do_not_litter:`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `<!here> There are *${branches.length}* stale branches in *${repository}*! Click the delete button if the branch is no longer used. :do_not_litter:`,
          },
        },
        {
          type: 'divider',
        },
      ],
    });
  });

  it('posts branch messages', async () => {
    // when
    await publishMessages({ channel, repository, branches });

    // then
    [1, 2].forEach((num) => {
      expect(postMessage).toBeCalledWith({
        channel,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: `test/dale${num}`,
            },
          },
        ],
      });
    });
  });
});
