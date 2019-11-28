const { postMessage } = require('./chat');
const composeBlocks = require('./composeBlocks');

module.exports = async ({ channel, repository, branches }) => {
  const header = {
    type: 'mrkdwn',
    text: `<!here> There are *${branches.length}* stale branches in *${repository}*! Click the delete button if the branch is no longer used. :do_not_litter:`,
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

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < blocks.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await postMessage({ channel, blocks: [blocks[i]] });
  }

  return response;
};
