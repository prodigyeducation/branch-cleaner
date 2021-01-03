/* eslint-disable */
import { update } from './chat';

module.exports = async ({ channel, message: { ts, blocks }, user, repository, branch, result }) => {
  let text;
  if (result === 'S') {
    text = `>~*${branch}*~\n>💯 _Deleted by <@${user.id}>_`;
    delete blocks[0].accessory;
  } else if (result === 'A') {
    text = `>~*${branch}*~\n>😉 _Already deleted by someone else._`;
    delete blocks[0].accessory;
  } else {
    const link = `>*<https://github.com/SMARTeacher/${repository}/tree/${name}|${name}>*`;
    const meta = `>⏰ _${date}_ 👨‍💻 _${user.name || user.login || user.email}_`;
    text = `${link}\n${meta}`;
  }
  blocks[0].text.text = text;

  try {
    const response = await update({
      channel: channel.id,
      ts,
      type: 'mrkdwn',
      text,
      blocks,
    });

    console.log('#result.data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('#error:', JSON.stringify(error, null, 2));
  }
};
