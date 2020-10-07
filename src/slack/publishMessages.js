const { postMessage } = require('./chat');
const composeBlocks = require('./composeBlocks');

const normalHeaderMessage = ({ branches, repository }) =>
  `<!here> There are *${branches.length}* stale branches in *${repository}*! Click the delete button if the branch is no longer used. :do_not_litter:`;
const zeroStaleHeaderMessage = ({ repository }) =>
  `🎊 There are *ZERO* stale branches in *${repository}*!👏`;

const publishMessages = async ({ channel, repository, branches }) => {
  const header = {
    type: 'mrkdwn',
    text: branches.length
      ? normalHeaderMessage({ branches, repository })
      : zeroStaleHeaderMessage({ repository }),
  };

  const headerBlocks = [
    {
      type: 'section',
      text: header,
    },
    ...(branches.length
      ? [
          {
            type: 'divider',
          },
        ]
      : []),
  ];

  const response = await postMessage({
    channel,
    ...header,
    blocks: headerBlocks,
  });

  if (branches.length) {
    const blocks = composeBlocks({ repository, branches });

    // forEach can't be used here because the messages will show up out of order in Slack
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < blocks.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await postMessage({ channel, blocks: [blocks[i]] });
    }
  }

  return response;
};

module.exports = publishMessages;
module.exports.normalHeaderMessage = normalHeaderMessage;
module.exports.zeroStaleHeaderMessage = zeroStaleHeaderMessage;
