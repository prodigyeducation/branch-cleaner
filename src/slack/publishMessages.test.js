import publishMessages, { zeroStaleHeaderMessage, normalHeaderMessage } from './publishMessages';
import { postMessage } from './chat';
import composeBlocks from './composeBlocks';

jest.mock('./chat');
jest.mock('./composeBlocks');

describe('publishMessages', () => {
  // given
  const channel = 'CK2853T7S';
  const repository = 'test-repository';

  afterEach(() => {
    postMessage.mockClear();
  });
  afterEach(() => {
    composeBlocks.mockClear();
  });

  describe('when there 0 stale branches', () => {
    const branches = [];
    it('only posts exactly one message', async () => {
      // when
      await publishMessages({ channel, repository, branches });

      // then
      expect(postMessage).toBeCalledTimes(1);
    });

    it('posts zero stale branches celebration header message', async () => {
      // when
      await publishMessages({ channel, repository, branches });

      // then
      expect(postMessage).toBeCalledWith({
        channel,
        type: 'mrkdwn',
        text: zeroStaleHeaderMessage({ repository }),
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: zeroStaleHeaderMessage({ repository }),
            },
          },
        ],
      });
    });

    it('does not compose blocks', async () => {
      await publishMessages({ channel, repository, branches });
      expect(composeBlocks).toBeCalledTimes(0);
    });
  });
  describe('when there are 1 or more stale branches', () => {
    const branches = [1, 2].map((num) => ({
      date: `2019-0${num}-0${num}`,
      name: `test/dale${num}`,
    }));

    beforeAll(() => {
      composeBlocks.mockReturnValue(
        [1, 2].map((num) => ({
          type: 'section',
          text: {
            type: 'plain_text',
            text: `test/dale${num}`,
          },
        }))
      );
    });

    it('posts one message per branch + a header message', async () => {
      // when
      await publishMessages({ channel, repository, branches });

      // then
      expect(postMessage).toBeCalledTimes(branches.length + 1);
    });

    it('composes blocks', async () => {
      await publishMessages({ channel, repository, branches });
      expect(composeBlocks).toBeCalledTimes(1);
    });

    it('posts normal header message', async () => {
      // when
      await publishMessages({ channel, repository, branches });

      // then
      expect(postMessage).toBeCalledWith({
        channel,
        type: 'mrkdwn',
        text: normalHeaderMessage({ branches, repository }),
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: normalHeaderMessage({ branches, repository }),
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
});
