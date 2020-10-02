const { postMessage } = require('./chat');
const composeBlocks = require('./composeBlocks');

const normalHeaderMessage = ({ branches, repository }) =>
  `<!here> There are *${branches.length}* stale branches in *${repository}*! Click the delete button if the branch is no longer used. :do_not_litter:`;
const zeroStaleHeaderMessage = ({ repository }) =>
  `🎊 There are *ZERO* stale branches in *${repository}*!👏`;

const defaultFunction = async ({ channel, repository, branches }) => {
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
    {
      type: 'divider',
    },
  ];

  const response = await postMessage({
    channel,
    ...header,
    blocks: headerBlocks,
  });

  const blocks = composeBlocks({ repository, branches });

  blocks.forEach((block) => postMessage({ channel, blocks: [block] }));

  return response;
};

module.exports = defaultFunction;
module.exports.normalHeaderMessage = normalHeaderMessage;
module.exports.zeroStaleHeaderMessage = zeroStaleHeaderMessage;
